import {Dispatch, InputIdentityList, SetStateAction, useCallback, useEffect, useState} from "react";

export const useInput = <T>(initialValue: T): {value: T, setValue: Dispatch<SetStateAction<T>>, onChange: React.ChangeEventHandler<HTMLInputElement>} => {
    const [value, setValue] = useState<T>(initialValue);
    const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(e => {
        setValue(e.target.value as unknown as T)
    }, []);

    return {
        value,
        setValue,
        onChange
    }
};

export interface KeyboardShortcut {
    keys: string[]
    action: (...arg: any) => void
}

export const useKeyboardInput = (listener: (e: KeyboardEvent) => void, inputs?: InputIdentityList) => {
    useEffect(() => {
        window.addEventListener('keydown', listener);

        return () => {
            window.removeEventListener('keydown', listener)
        }
    }, inputs)
};


export const useKeyboardShortcuts = (shortcuts: KeyboardShortcut[], inputs?: InputIdentityList) => {
    useKeyboardInput(e => {
        shortcuts.forEach(shortcut => {
            if (
                shortcut.keys.some(key => key.toLowerCase() === e.key.toLowerCase())
            ) {
                shortcut.action()
            }
        })
    }, inputs)
};