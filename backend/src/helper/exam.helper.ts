import TryoutSectionService from "../services/tryout_section.service.js";
import SymbolService from "../services/symbol.service.js";
import examConfig from "../config/exam.config.js";

async function getExamDuration(tryoutSection: any): Promise<number> {
    const { durationPerSessions, numberOfSessions } = tryoutSection.data;
    const totalIntervalTime =
        examConfig.accuracyTest.intervalSessionTime * numberOfSessions;

    return (
        durationPerSessions * numberOfSessions +
        totalIntervalTime +
        examConfig.accuracyTest.timeTolerance
    );
}

async function generateNewSessions(
    tryoutSectionData: any,
    symbols: string
): Promise<any> {
    const { numberOfSessions } = tryoutSectionData;

    const sessions = [];
    for (let i = 0; i < numberOfSessions; i++) {
        const characters = await pickRandomCharacters(
            symbols,
            examConfig.accuracyTest.numberOfRandomCharacters
        );

        sessions.push({
            characters,
            status: "not-started",
            title: "Session " + (i + 1),
            accuracyScore: 0.0,
            totalCorrect: 0,
            totalIncorrect: 0,
            endTime: null,
            questions: [],
        });
    }
    return sessions;
}

async function pickRandomCharacters(str: string, n: number): Promise<string> {
    if (n > str.length) {
        throw new Error(
            `Cannot pick ${n} unique characters from a string of length ${str.length}`
        );
    }

    const characters = [];
    const availableChars = str.split("");

    for (let i = 0; i < n; i++) {
        const randomIndex = Math.floor(Math.random() * availableChars.length);
        const char = availableChars[randomIndex];
        characters.push(char);
        availableChars.splice(randomIndex, 1);
    }

    return characters.join("");
}

async function generateNewQuestion(characters: string): Promise<any> {
    const shuffledString = await shuffleString(characters);
    const { question, trueAnswer } = await pickTrueAnswerAndQuestion(
        shuffledString
    );

    return {
        question: question,
        option: shuffledString,
        trueAnswer: trueAnswer,
        userAnswer: null,
    };
}

async function shuffleString(str: string): Promise<string> {
    const arr = str.split(""); // Convert string to array
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Random index
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
    return arr.join(""); // Convert back to string
}

async function pickTrueAnswerAndQuestion(shuffledStr: string): Promise<{
    question: string;
    trueAnswer: string;
}> {
    const randomIndex = Math.floor(Math.random() * shuffledStr.length);
    const trueAnswer = shuffledStr[randomIndex];
    const question =
        shuffledStr.slice(0, randomIndex) + shuffledStr.slice(randomIndex + 1);

    return { question, trueAnswer };
}

class ExamHelper {
    async generateNewExamData(tryoutSectionId: string): Promise<any> {
        const tryoutSection = await TryoutSectionService.getById(
            tryoutSectionId
        );
        const symbols = await SymbolService.getAll().then((res: any) => {
            return res[Math.floor(Math.random() * res.length)].characters;
        });

        const duration = await getExamDuration(tryoutSection);
        const endTimeTest = new Date();
        endTimeTest.setMinutes(endTimeTest.getMinutes() + duration);

        return {
            status: "in-progress",
            type: "accuracy_test",
            referenceId: tryoutSection.id,
            accuracyTest: tryoutSection.data,
            symbols: symbols,
            sessions: await generateNewSessions(tryoutSection.data, symbols),
            duration: duration,
            intervalTime: examConfig.accuracyTest.intervalSessionTime,
            endTimeTest: endTimeTest.toISOString(),
            totalAccuracyScore: 0.0,
            currentSession: 0,
            currentQuestion: 0,
        };
    }

    async startSession(data: any): Promise<any> {
        const sessions = data.sessions;
        const currentSession = sessions[data.currentSession];
        if (currentSession === undefined) {
            throw new Error("Session not found");
        }

        currentSession.status = "in-progress";
        const endTimeTest = new Date();
        endTimeTest.setMinutes(
            endTimeTest.getMinutes() + data.accuracyTest.durationPerSessions
        );
        currentSession.endTime = endTimeTest;
        currentSession.questions.push(
            await generateNewQuestion(currentSession.characters)
        );

        sessions[data.currentSession] = currentSession;
        return {
            ...data,
            sessions: sessions,
        };
    }

    async nextQuestion(data: any, answer: string): Promise<any> {
        const sessions = data.sessions;
        const currentSession = sessions[data.currentSession];
        const currentQuestion = currentSession.questions[data.currentQuestion];
        if (currentQuestion === undefined) {
            throw new Error("Question not found");
        }

        currentQuestion.userAnswer = answer;
        if (answer === currentQuestion.trueAnswer) {
            currentSession.totalCorrect += 1;
        } else {
            currentSession.totalIncorrect += 1;
        }

        const accuracyScore =
            currentSession.totalCorrect /
            (currentSession.totalCorrect + currentSession.totalIncorrect);
        currentSession.accuracyScore = accuracyScore.toFixed(3);

        currentSession.questions[data.currentQuestion] = currentQuestion;
        currentSession.questions.push(
            await generateNewQuestion(currentSession.characters)
        );

        sessions[data.currentSession] = currentSession;

        data.currentQuestion += 1;
        return {
            ...data,
            sessions: sessions,
        };
    }

    async endSession(data: any): Promise<any> {
        const sessions = data.sessions;
        const currentSession = sessions[data.currentSession];
        if (currentSession === undefined) {
            throw new Error("Session not found");
        }

        currentSession.questions.pop();
        currentSession.status = "completed";
        sessions[data.currentSession] = currentSession;

        if (data.currentSession === data.accuracyTest.numberOfSessions - 1) {
            data.status = "completed";
            let totalAccuracyScore = 0.0;
            data.sessions.forEach((session: any) => {
                totalAccuracyScore += session.accuracyScore;
            });
            data.totalAccuracyScore = (
                totalAccuracyScore / data.accuracyTest.numberOfSessions
            ).toFixed(3);
        }

        data.currentQuestion = 0;
        data.currentSession += 1;
        return {
            ...data,
            sessions: sessions,
        };
    }
}

export default new ExamHelper();
