import { Intent } from '@blueprintjs/core';
import { RISK_THRESHOLD } from './constants';

export const toPercent = (num) => `${(Math.round(num * 10000) / 100)}%`;

export const getIntentFromRisk = (risk) => {
    if (risk >= RISK_THRESHOLD) {
        return Intent.DANGER;
    } else if (risk >= 0.4) {
        return Intent.WARNING
    }
    return Intent.NONE;
};