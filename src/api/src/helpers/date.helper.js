module.exports = class DateHelper {
    static hasAtLeastTimeAgo(targetDate, timeSeconds) {
        const curDate = new Date();
        targetDate = new Date(targetDate);

        const curTime = curDate.getTime() / 1000;
        const targetTime = targetDate.getTime() / 1000;

        const diff = curTime - timeSeconds;
        return targetTime <= diff;
    }
};
