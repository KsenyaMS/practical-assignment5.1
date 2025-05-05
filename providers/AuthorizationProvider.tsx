import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

export enum UserType {
    User = 'user',
    Guest = 'guest',
}

export const initialValue: UserType = localStorage.getItem('userType') as UserType ?? UserType.Guest;

export const authorizationAtom = atom<UserType>(initialValue);

export function useUserType() {
    const [userType, setUserType] = useAtom(authorizationAtom);

    useEffect(() => {
        localStorage.setItem('userType', userType);

    }, [userType]);

    return [userType, setUserType] as const;
}