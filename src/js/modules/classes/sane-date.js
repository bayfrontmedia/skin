// noinspection JSUnusedGlobalSymbols

export default class SaneDate {

    /**
     * @type {Date}
     * @private
     */
    #date;

    constructor(date = new Date()) {
        this.#date = date;
    }

    /**
     * Get Date instance.
     *
     * @returns {Date}
     */
    getDate() {
        return this.#date;
    }

    /**
     * Convert local date to UTC date.
     *
     * @returns {SaneDate}
     */
    toUTC() {
        this.#date = new Date(this.#date.getTime() + (this.#date.getTimezoneOffset() * 60 * 1000));
        return this;
    }

    /**
     * Convert UTC date to local date.
     *
     * @returns {SaneDate}
     */
    toLocal() {

        const offset = this.#date.getTimezoneOffset();

        if (offset > 0) {

            this.minus({
                minutes: offset
            });

            return this;
        }

        this.plus({
            minutes: Math.abs(offset)
        });

        return this;

    }

    /**
     * Subtract time from date.
     *
     * Valid options:
     * - years
     * - months
     * - weeks
     * - days
     * - hours
     * - minutes
     * - seconds
     * - milliseconds
     *
     * @param options {Object}
     * @returns {SaneDate}
     */
    minus(options) {

        const date = this.#date;

        if (options.hasOwnProperty('years')) {
            date.setFullYear(date.getFullYear() - options.years);
        }

        if (options.hasOwnProperty('months')) {
            date.setMonth(date.getMonth() - options.months);
        }

        if (options.hasOwnProperty('weeks')) {
            date.setDate(date.getDate() - (options.weeks * 7));
        }

        if (options.hasOwnProperty('days')) {
            date.setDate(date.getDate() - options.days);
        }

        if (options.hasOwnProperty('hours')) {
            date.setHours(date.getHours() - options.hours);
        }

        if (options.hasOwnProperty('minutes')) {
            date.setMinutes(date.getMinutes() - options.minutes);
        }

        if (options.hasOwnProperty('seconds')) {
            date.setSeconds(date.getSeconds() - options.seconds);
        }

        if (options.hasOwnProperty('milliseconds')) {
            date.setMilliseconds(date.getMilliseconds() - options.milliseconds);
        }

        this.#date = date;

        return this;

    }

    /**
     * Add time to date.
     *
     * Valid options:
     * - years
     * - months
     * - weeks
     * - days
     * - hours
     * - minutes
     * - seconds
     * - milliseconds
     *
     * @param options {Object}
     * @returns {SaneDate}
     */
    plus(options) {

        const date = this.#date;

        if (options.hasOwnProperty('years')) {
            date.setFullYear(date.getFullYear() + options.years);
        }

        if (options.hasOwnProperty('months')) {
            date.setMonth(date.getMonth() + options.months);
        }

        if (options.hasOwnProperty('weeks')) {
            date.setDate(date.getDate() + (options.weeks * 7));
        }

        if (options.hasOwnProperty('days')) {
            date.setDate(date.getDate() + options.days);
        }

        if (options.hasOwnProperty('hours')) {
            date.setHours(date.getHours() + options.hours);
        }

        if (options.hasOwnProperty('minutes')) {
            date.setMinutes(date.getMinutes() + options.minutes);
        }

        if (options.hasOwnProperty('seconds')) {
            date.setSeconds(date.getSeconds() + options.seconds);
        }

        if (options.hasOwnProperty('milliseconds')) {
            date.setMilliseconds(date.getMilliseconds() + options.milliseconds);
        }

        this.#date = date;

        return this;

    }

    /**
     * Set date to start of option.
     *
     * Valid options:
     * - year
     * - quarter
     * - month
     * - week
     * - day
     * - hour
     * - minute
     * - second
     *
     * @param option {string}
     * @returns {SaneDate}
     */
    startOf(option) {

        if (option === 'year') {
            this.#date.setMonth(0);
            this.#date.setDate(1);
            this.#date.setHours(0, 0, 0, 0);
        } else if (option === 'quarter') {
            const month = this.#date.getMonth();
            const quarterStartMonth = Math.floor(month / 3) * 3;
            this.#date.setMonth(quarterStartMonth, 1);
            this.#date.setHours(0, 0, 0, 0);
        } else if (option === 'month') {
            this.#date.setDate(1);
            this.#date.setHours(0, 0, 0, 0);
        } else if (option === 'week') {
            const day = this.#date.getDay(); // 0-6
            this.#date.setHours(0, 0, 0, 0);
            this.#date.setDate(this.#date.getDate() - day);
        } else if (option === 'day') {
            this.#date.setHours(0, 0, 0, 0);
        } else if (option === 'hour') {
            this.#date.setMinutes(0, 0, 0);
        } else if (option === 'minute') {
            this.#date.setSeconds(0, 0);
        } else if (option === 'second') {
            this.#date.setMilliseconds(0);
        }

        return this;

    }

    /**
     * Set date to end of option.
     *
     * Valid options:
     * - year
     * - quarter
     * - month
     * - week
     * - day
     * - hour
     * - minute
     * - second
     *
     * @param option {string}
     * @returns {SaneDate}
     */
    endOf(option) {

        if (option === 'year') {
            this.#date.setMonth(11);
            this.#date.setDate(31);
            this.#date.setHours(23, 59, 59, 999);
        } else if (option === 'quarter') {
            const result = new Date(this.#date);
            const month = result.getMonth();
            const quarterEndMonth = Math.floor(month / 3) * 3 + 2;
            this.#date.setMonth(quarterEndMonth + 1, 1);
            this.#date.setHours(0, 0, 0, 0);
            this.#date.setMilliseconds(this.#date.getMilliseconds() - 1);
        } else if (option === 'month') {
            this.#date.setMonth(this.#date.getMonth() + 1);
            this.#date.setDate(1);
            this.#date.setHours(0, 0, 0, 0);
            this.#date.setMilliseconds(this.#date.getMilliseconds() - 1);
        } else if (option === 'week') {
            const day = this.#date.getDay();
            const daysToSaturday = 6 - day;
            this.#date.setHours(23, 59, 59, 999);
            this.#date.setDate(this.#date.getDate() + daysToSaturday);
        } else if (option === 'day') {
            this.#date.setHours(23, 59, 59, 999);
        } else if (option === 'hour') {
            this.#date.setMinutes(59, 59, 999);
        } else if (option === 'minute') {
            this.#date.setSeconds(59, 999);
        } else if (option === 'second') {
            this.#date.setMilliseconds(999);
        }

        return this;

    }

    /**
     * Get date in ISO string format.
     *
     * @param includeMilliseconds {boolean}
     * @returns {string}
     */
    getISOString(includeMilliseconds = false) {
        const pad = n => String(n).padStart(2, '0');

        const year = this.#date.getFullYear();
        const month = pad(this.#date.getMonth() + 1);
        const day = pad(this.#date.getDate());
        const hours = pad(this.#date.getHours());
        const minutes = pad(this.#date.getMinutes());
        const seconds = pad(this.#date.getSeconds());
        const ms = pad(this.#date.getMilliseconds(), 3);

        if (includeMilliseconds === false) {
            return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
        }

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${ms}Z`;

    }

    /**
     * Get date in datetime format.
     *
     * @returns {string}
     */
    getDateTime() {

        const year = this.#date.getFullYear();
        const month = String(this.#date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(this.#date.getDate()).padStart(2, '0');

        const hours = String(this.#date.getHours()).padStart(2, '0');
        const minutes = String(this.#date.getMinutes()).padStart(2, '0');
        const seconds = String(this.#date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    }

    /**
     * Get date in Y-m-d format.
     *
     * @returns {string}
     */
    getYmd() {

        const pad = n => String(n).padStart(2, '0');

        const year = this.#date.getFullYear();
        const month = pad(this.#date.getMonth() + 1);
        const day = pad(this.#date.getDate());

        return `${year}-${month}-${day}`;

    }

    /**
     * Get date quarter of year.
     *
     * @returns {number}
     */
    getQuarter() {
        const month = this.#date.getMonth();
        return Math.floor(month / 3) + 1;
    }

    /**
     * Get date name of month.
     *
     * @param months {Array}
     * @returns {string}
     */
    getMonthName(months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']) {
        return months[this.#date.getMonth()];
    }

    /**
     * Get date week number.
     *
     * @returns {number}
     */
    getWeekNumber() {

        const d = new Date(Date.UTC(this.#date.getFullYear(), this.#date.getMonth(), this.#date.getDate()));

        // Set to nearest Thursday (week 1)
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);

        // Calculate first day of year
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));

        // Calculate full weeks to nearest Thursday
        return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);

    }

    /**
     * Return numeric day of year (1-365/366 in leap years).
     *
     * @returns {number}
     */
    getDayOfYear() {

        const start = new Date(this.getDate().getFullYear(), 0, 1); // Jan 1st of same year
        const diff = this.getDate() - start; // ms since Jan 1
        const oneDay = 1000 * 60 * 60 * 24; // ms per day
        return Math.floor(diff / oneDay) + 1;
    }

    /**
     * Get date name of day.
     *
     * @param days {Array}
     * @returns {string}
     */
    getDayName(days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']) {
        return days[this.#date.getDay()];
    }

    /**
     * Is date a weekday?
     *
     * @returns {boolean}
     */
    isWeekday() {
        const day = this.#date.getDay();
        return day >= 1 && day <= 5;
    }

    /**
     * Is date a weekend?
     *
     * @returns {boolean}
     */
    isWeekend() {
        return !this.isWeekday();
    }

    /**
     * Is date before given date?
     *
     * @param date {Date}
     * @returns {boolean}
     */
    isBefore(date) {
        return this.#date.getTime() <= date.getTime();
    }

    /**
     * Is date after given date?
     *
     * @param date {Date}
     * @returns {boolean}
     */
    isAfter(date) {
        return !this.isBefore(date);
    }

    /**
     * Is date the same as given date?
     *
     * @param date {Date}
     * @returns {boolean}
     */
    isSameDate(date) {

        const thisDate = this.#date.setHours(0, 0, 0, 0);
        const givenDate = date.setHours(0, 0, 0, 0);

        return thisDate === givenDate;

    }

    /**
     * Get milliseconds between current and given date.
     *
     * @param date {Date}
     * @returns {number}
     */
    getMillisecondsBetween(date = new Date()) {
        return this.#date.getTime() - date.getTime();
    }

    /**
     * Get seconds between current and given date.
     *
     * @param date {Date}
     * @param decimals {number}
     * @returns {number}
     */
    getSecondsBetween(date = new Date(), decimals = 0) {
        const secs = this.getMillisecondsBetween(date) / 1000;
        if (decimals === 0) {
            return Math.floor(secs);
        }
        return Number(secs.toFixed(decimals));
    }

    /**
     * Get minutes between current and given date.
     *
     * @param date {Date}
     * @param decimals {number}
     * @returns {number}
     */
    getMinutesBetween(date = new Date(), decimals = 0) {
        const mins = this.getMillisecondsBetween(date) / (1000 * 60);
        if (decimals === 0) {
            return Math.floor(mins);
        }
        return Number(mins.toFixed(decimals));
    }

    /**
     * Get hours between current and given date.
     *
     * @param date {Date}
     * @param decimals {number}
     * @returns {number}
     */
    getHoursBetween(date = new Date(), decimals = 0) {
        const hrs = this.getMillisecondsBetween(date) / (1000 * 60 * 60);
        if (decimals === 0) {
            return Math.floor(hrs);
        }
        return Number(hrs.toFixed(decimals));
    }

    /**
     * Get days between current and given date.
     *
     * @param date {Date}
     * @param decimals {number}
     * @returns {number}
     */
    getDaysBetween(date = new Date(), decimals = 0) {
        const days = this.getMillisecondsBetween(date) / (1000 * 60 * 60 * 24);
        if (decimals === 0) {
            return Math.floor(days);
        }
        return Number(days.toFixed(decimals));
    }

    /**
     * Get years between current and given date.
     *
     * @param date {Date}
     * @param decimals {number}
     * @returns {number}
     */
    getYearsBetween(date = new Date(), decimals = 0) {
        const years = this.getMillisecondsBetween(date) / (1000 * 60 * 60 * 24 * 365.2425);
        if (decimals === 0) {
            return Math.floor(years);
        }
        return Number(years.toFixed(decimals));
    }

}