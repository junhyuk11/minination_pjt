import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();
export const identityState = atom({
    key: 'identityState',
    default: '',
    effects_UNSTABLE: [persistAtom],
});
// 아래처럼 추가하세용가뤼.
export const somethingState = atom({
    key: 'somethingState',
    default: '',
    effects_UNSTABLE: [persistAtom],
});
