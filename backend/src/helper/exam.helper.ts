import TryoutSectionService from "../services/tryout_section.service.js";
import SymbolService from "../services/symbol.service.js";
import examConfig from "../config/exam.config.js";

export async function generateNewExamData(
    tryoutSectionId: string
): Promise<any> {
    const tryoutSection = await TryoutSectionService.getById(tryoutSectionId);
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
        totalScore: null,
        currentSession: 0,
        currentQuestion: 0,
    };
}

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

async function generateNewQuestion(
    totalQuestionPerSessions: number,
    characters: string
): Promise<any> {
    const questions = [];
    let shuffledString = characters;
    for (let i = 0; i < totalQuestionPerSessions; i++) {
        shuffledString = await shuffleString(shuffledString);
        const { question, trueAnswer } = await pickTrueAnswerAndOptions(
            shuffledString
        );
        questions.push({
            question: question,
            option: shuffledString,
            trueAnswer: trueAnswer,
            userAnswer: null,
        });
    }

    return questions;
}

async function shuffleString(str: string): Promise<string> {
    const arr = str.split(""); // Convert string to array
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Random index
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
    return arr.join(""); // Convert back to string
}

async function pickTrueAnswerAndOptions(shuffledStr: string): Promise<{
    question: string;
    trueAnswer: string;
}> {
    const randomIndex = Math.floor(Math.random() * shuffledStr.length);
    const trueAnswer = shuffledStr[randomIndex];
    const question =
        shuffledStr.slice(0, randomIndex) + shuffledStr.slice(randomIndex + 1);

    return { question, trueAnswer };
}
