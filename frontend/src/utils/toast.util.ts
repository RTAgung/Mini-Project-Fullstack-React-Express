import { toast as hotToast, ToastOptions } from "react-hot-toast";

const warning = (message: string, options?: ToastOptions) =>
    hotToast(message, {
        icon: "⚠️",
        style: {
            border: "1px solid #fb923c", // orange-400
            padding: "6px 12px",
            color: "#9a3412", // orange-800
            background: "#ffedd5", // orange-100
        },
        ...options,
    });

export const toast = {
    ...hotToast,
    warning,
};
