/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /*Tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed object
         * in the allFeeds array and ensures it has a property called URL property defined, 
         * that the it is not empty and check if it is valid
         */
        it('has url defined and is not empty', function() {
            allFeeds.forEach(function(feed) {
                let currentUrl = feed.url;
                expect(currentUrl).toBeTruthy();
                expect(typeof currentUrl).toBe('string');
                expect(currentUrl).toMatch("^" +
                    // protocol identifier
                    "(?:(?:https?|ftp)://)" +
                    // user:pass authentication
                    "(?:\\S+(?::\\S*)?@)?" +
                    "(?:" +
                    // IP address exclusion
                    // private & local networks
                    "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
                    "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
                    "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
                    // IP address dotted notation octets
                    // excludes loopback network 0.0.0.0
                    // excludes reserved space >= 224.0.0.0
                    // excludes network & broacast addresses
                    // (first & last IP address of each class)
                    "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
                    "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
                    "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
                    "|" +
                    // host name
                    "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
                    // domain name
                    "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
                    // TLD identifier
                    "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
                    // TLD may end with dot
                    "\\.?" +
                    ")" +
                    // port number
                    "(?::\\d{2,5})?" +
                    // resource path
                    "(?:[/?#]\\S*)?" +
                    "$", "i");
            });
        });

        /* This test loops through each feed object
         * in the allFeeds array and ensures it has a property called name defined
         * and that the it is not empty.
         */
        it('has name define and it is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeTruthy();
                expect(typeof feed.name).toBe('string');
            });
        });
    });


    /* Test suite named "The menu" */
    describe('The menu', function() {
        let menuIcon, mainContainer;
        beforeAll(function() {
            menuIcon = $('.menu-icon-link');
            mainContainer = $('body');
        });
        /* This test ensures the menu element is
         * hidden by default. Checking that when the 
         * page first loaded the body element contain the 
         * "menu-hidden" class.
         */
        it('is hidden by default', function() {
            expect(mainContainer.hasClass('menu-hidden')).toBe(true);
        });

        /* This test ensures that the menu changes
         * visibility when the menu icon is clicked. Checking that when the icon is clicked
         * the menu appear if the body does not contain the "menu-hidden" class and it hide
         * if the body contain the class.
         */
        it('change visibility when the menu icon is clicked', function() {
            menuIcon.click();
            expect(mainContainer.hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect(mainContainer.hasClass('menu-hidden')).toBe(true);
        });

    });
    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(3, done);
        });
        /* This test that ensures than when the loadFeed
         * function is called and completes its work, there is at least
         * a single. Checking that the amount of .entry inside .feed container
         * is actually grether than 0.
         */
        it('there is at least one .entry element within the .feed container', function(done) {
            let feedContainer = $('.feed .entry');
            expect(feedContainer.length).toBeGreaterThan(0);
            done();
        });

    });

    /*Test suite named "New Feed Selection" */

    describe('New Feed Selection', function() {
        let index2Feeds, index0Feeds;

        beforeEach(function(done) {
            loadFeed(2, function() {
                index2Feeds = $('.feed').html();
                loadFeed(0, function() {
                    index0Feeds = $('.feed').html();
                    done();
                });
            });
        });
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Checking that the comparisson between the content in .feed container
         * after one call to loadFeed function is different
         *  that the content in .feed container after a second call to loadFeed function.
         */
        it('is loaded the content change', function(done) {
            expect(index2Feeds).not.toBe(index0Feeds);
            done();
        });
    });
}());