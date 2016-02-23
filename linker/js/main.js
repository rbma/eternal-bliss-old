$(document).ready(function(){


    var win_height = $(window).height();
    var win_width = $(window).width();
    var scrollTop = $(window).scrollTop(),
    elementOffset = $('#poems').offset().top,
    distance = (elementOffset - scrollTop);
    var normal;
    

    //DOM cache shit
    var song = document.getElementsByTagName('audio')[0];
    var poems = $('#poems');
    var images = $('#background img.show');
    var cloudContainer = $('.cloud-wrap');
    var nowPlaying = $('nav');
    var flash = $('#flash');
    var currentDeets = $('#current-deets');
    var leftPlant = $('#potted-plant-left');
    var rightPlant = $('#potted-plant-right');
    var globe = $('.globe');
    var arrows = $('#arrows');
    var wrapper = $('#wrapper');
    var share = $('.share');


    //Stores, parameters
    var time = 0; //stores meditation length
    var infiniteCounter = 0; //stores if loop has been made
    var globalArtist, globalLink;
    var player, city;
    var enlarge = 1.2;
    var currentMedia = 0;
    var elementHeight = 0;
    var pictureAdd = 0;
    var poemCycles = 200; //how many times do we want the full loop of 24 poems?
    var speed = 1; //speed multiple. somewhat arbitrary. lower is faster
    var scrollSpeed;
    var speedCounter = 2; //default. between 0-10. controls rate of scroll
    var cloudCycle = 91000; //how long do we want the clouds to last for before refresh, also affects speed
    var desktop = true; //default
    var cycleLength = 100; //approx how many statements per 10 minute session at normal speed?
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        desktop = false;
    }
    var prefix = '//d3qcuxqrj7wgbi.cloudfront.net/media/';
    var imgPrefix = '//d3qcuxqrj7wgbi.cloudfront.net/images/';
    // var wordBucket = '//d3qcuxqrj7wgbi.cloudfront.net/media/words.json';
    var wordBucket = "https://s3-us-west-2.amazonaws.com/eternalbliss/media/words.json";
    
    //CLOUD CONTROL
    var cloudNum = 10;
    var maxCloudSize = 1200;
    var int1; //used to clear clouds when window is blurred
    
    //words
    var locations, senses, adjectives, nouns, verbs, move_verbs,
        plural_verbs, ing_verbs, statements, prepositions,
        bodyparts, you, adverbs, states, thought_states, ways, colors,
        past_verbs, s, p, ps, the;

    //DATE MAFACKA
    var objToday = new Date(),
        weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
        dayOfWeek = weekday[objToday.getDay()],
        domEnder = new Array( 'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th' ),
        dayOfMonth = today + (objToday.getDate() < 10) ? '0' + objToday.getDate() : objToday.getDate(),
        months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
        curMonth = months[objToday.getMonth()],
        curYear = objToday.getFullYear();
    var today = dayOfWeek + ", " + curMonth + " " + dayOfMonth;



    //MEDIA COLLECTION


    var media = [

        sunset = {
            video: 'sunset1',
            song: 'kraft',
            title: '"Anne & Nancy"',
            artist: 'Suzanne Kraft',
            hasTwitter: true,
            link: 'https://soundcloud.com/suzannekraft',
            twitterUser: 'suzannekraft',
            zone: 'Tropic Of Drift',
            img: 'field'
        },
        splash = {
            video: 'splash',
            song: 'Aquarius',
            artist: 'Anenon',
            hasTwitter: true,
            link: 'https://twitter.com/anenonmusic',
            twitterUser: 'anenonmusic',
            title: '"Aquarius"',
            zone: 'Refresh Your Chakra',
            img: 'spa'
        },
        yoga = {
            video: 'world',
            song: 'water',
            title: '"Water"',
            artist: 'A.r.t. Wilson',
            hasTwitter: true,
            link: 'http://andrasfox.bandcamp.com/',
            twitterUser: 'andrasfox',
            zone: 'Infinite Pangaea',
            img: 'fern'

        },

        massage = {
            video: 'man-head',
            song: 'daisuke',
            title: '"Sugar Bell"',
            hasTwitter: true,
            artist: 'Daisuke Tanabe',
            link: 'https://soundcloud.com/daisuketanabe',
            twitterUser: 'daisuketanabe',
            zone: 'Ayurveda Dream',
            img: 'man-massage'
        },
        waterfall = {
            video: 'waterfall',
            song: 'gora',
            title: '"Ginseng"',
            artist: 'Gora Sou',
            hasTwitter: true,
            link: 'https://www.facebook.com/pages/Gora-Sou/301830476577191',
            twitterUser: 'GoraSou',
            zone: 'Rainforest Trance',
            img: 'pond2'
        },
        sleep = {
            video: 'sleep',
            song: 'linen-no-drums2',
            title: '"Linen"',
            artist: 'James Pants',
            hasTwitter: true,
            link: 'https://twitter.com/sirjamespants',
            twitterUser: 'sirjamespants',
            zone: 'Rise And Shine',
            img: 'tai'
        },
        robot = {
            video: 'scan',
            song: 'retreat',
            title: '"Retreat"',
            hasTwitter: true,
            artist: 'Johnny Nash',
            link: 'http://melodyastruth.bandcamp.com/',
            twitterUser: 'manduwala',
            zone: 'Bionic Helix',
            img: 'hubble-3'
        },
        torus = {
            video: 'eyes',
            song: 'l1',
            title: '"We Owned Repetition"',
            artist: 'Lucrecia Dalt',
            hasTwitter: true,
            link: 'http://www.lucreciadalt.com/',
            twitterUser: 'lucreciadalt',
            zone: 'Virtual Hypnosis',
            img: 'crystal'
        }, swim = {
            video: 'swim',
            song: 'roosevelt',
            artist: 'May Roosevelt',
            hasTwitter: true,
            link: 'https://soundcloud.com/mayroosevelt',
            twitterUser: 'mayroosevelt',
            title: '"Hikaru"',
            zone: 'Aquatic Trance',
            img: 'buddha'
        }, head = {
            video: 'head',
            song: 'nightwave',
            title: '"Solfeggio Sun"',
            hasTwitter: true,
            artist: 'Nightwave',
            link: 'https://soundcloud.com/nightwave808',
            twitterUser: 'iamnightwave',
            zone: 'Celestial Chrome',
            img: 'yoga-man'
        },scan = {
            video: 'asteroid',
            song: 'venice',
            title: '"Ashvamap"',
            hasTwiter: true,
            artist: 'Venice',
            link: 'https://www.facebook.com/pages/Venice/72442749672?ref=hl',
            twitterUser: 'venicevenezia',
            zone: 'Quantum Harvest',
            img: 'face-massage-2'
        }
    ];

    
    //GET WORD BANK AND KICK THINGS OFF
    $.ajax({
        dataType: "json",
        url: wordBucket,
        success: function(data){
            locations = data.locations;
            senses = data.senses;
            adjectives = data.adjectives;
            nouns = data.nouns;
            badNouns = data.badNouns;
            stateNouns = data.stateNouns;
            verbs = data.verbs;
            move_verbs = data.move_verbs;
            plural_verbs = data.plural_verbs;
            ing_verbs = data.ing_verbs;
            statements = data.statements;
            prepositions = data.prepositions;
            bodyparts = data.bodyparts;
            you = data.you;
            adverbs = data.adverbs;
            states = data.states;
            thought_states = data.thought_states;
            traits = data.traits;
            practices = data.practices;
            ways = data.ways;
            colors = data.colors;
            past_verbs = data.past_verbs;
            sp = data.sp;
            p = data.p;
            s = data.s;
            the = data.the;
            tweets = data.tweets;

            //kick it off once words are loaded
            init();

        }
    });

    

    //STARTUPS
    init = function(){
        scatterClouds();
        var screen = addMedia();
        insertTweet();
        findLocation();
        loadStartVideo();
        if(!desktop){
            fadeInClouds();
        }
    };

    //MAKE SURE MOVIE IS 100% HEIGHT/WIDTH
    window.onresize = function(event){
        var height = $(window).height();
        var width = $(window).width();
        var ratio = width / height;
        //aspect ratio
        if (ratio >= 1.8){
            width = width * 1.1;
        }
        if (ratio < 1.8 && ratio >= 1.5){
            width = width * 1.2;
        }
        else if (ratio < 1.5 && ratio >= 1.27){
            width = width * 1.4;
        }

        else if (ratio < 1.27 && ratio > 1.12){
            width = width * 1.6;
        }
        else if (ratio < 1.12 && ratio > 1){
            width = width * 1.8;
        }
        else if (ratio < 1 && ratio > 0.75){
            width = width * 2.2;
        }

        else if (ratio < 0.75){
            width = width * 2.8;
        }
        
        else{
            width = width;
            height = height;
        }
        centerVid($('#startscreen'), width);
        $('#screen').attr('width', width);
        $('#startscreen').attr('width', width);

    };

    //initial background video
    loadStartVideo = function(){
        var width = $(window).width();
        var height = $(window).height();
        var ratio = width / height;

        if (ratio < 1.8 && ratio >= 1.5){
            width = width * 1.2;
        }
        else if (ratio < 1.5 && ratio >= 1.27){
            width = width * 1.4;
        }

        else if (ratio < 1.27 && ratio > 1.12){
            width = width * 1.6;
        }
        else if (ratio < 1.12 && ratio > 1){
            width = width * 1.8;
        }
        else if (ratio < 1 && ratio > 0.75){
            width = width * 2.2;
        }

        else if (ratio <= 0.75){

            width = width * 3;
        }
        
        else{
            width = width;
            height = height;

        }

        var video = prefix + 'stairs3.mp4';
        var videoWebM = prefix + 'stairs3.webm';
        $('#startvideo').html('<video id="startscreen" width="' + width + '" autoplay muted>' +
                '<source src="' + videoWebM + '" type="video/webm">' +
                '<source src="' + video + '" type="video/mp4"></video>');

        //center vid
        centerVid($('#startscreen'), width);
        //get rid of spinner when ready
        $('#startscreen').bind("loadeddata", function(){
            removeSpinner();
        });
        if(desktop){
            $('#startscreen').bind('ended', fadeInClouds);
        }
        
    };

    centerVid = function (container, width){
        var winwidth = $(window).width();
        var overflow = (winwidth - width) / 2;
        container.css({
            left: overflow + 'px'
        });
    };

    removeSpinner = function(){
        $('#spinner').transition({
            x: '-100%'
        }, 1000, function(){
            $('#spinner').remove();
        });
    };

    //Fisher Yates shuffle
    function shuffle(array){
        var currentIndex = array.length,
        temporaryValue,
        randomIndex;

        //whie there remains elements to shuffle
        while (0 !== currentIndex){
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            //and swap with current element
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
   

    //pick random video and song once clicked
    ranMedia = function(){
        var random_num = Math.floor(Math.random() * media.length);
        currentMedia = random_num;
        var random_media = media[random_num];
        return random_media;
    };

    ranImg = function(){
        var random_num = Math.floor(Math.random() * media.length);
        var random_media = media[random_num];
        var image = random_media.img;
        return image;
    };

    findLocation = function(){
        $.getJSON("http://freegeoip.net/json/",function(data){
            }).fail(function(data){
                return;
            }).success(function(data){
                if (data.city !== ''){
                    if (data.city === 'Mountain View'){
                        return;
                    }
                    else{
                        city = data.city;
                        poems.find('span').empty().text(city);
                    }
                    
                } else {
                    return;
                }
        });
    };


    //CLOUD STUFF
    clearClouds = function(){
        window.clearInterval(int1);
    };

    moveBackClouds = function(){
        $('#landing').css({
            zIndex: '-1'
        });
    };

    scatterClouds = function(){
        var placeX, placeY, cloudSize;
        
        //place each cloud somewhere on the page randomly
        for (i=0; i<=cloudNum; i++){
            placeX = (Math.floor(Math.random() * win_width)) + 'px';
            placeY = (Math.floor(Math.random() * win_height)) + 'px';
            cloudSize = Math.floor(Math.random() * maxCloudSize) + 'px';
            cloudContainer.append('<img src="//d3qcuxqrj7wgbi.cloudfront.net/images/cloud.png" id="leftcloud' + i + '" class="cloud" style="position: absolute; left:' + placeX + '; top: ' + placeY + '; width: ' + cloudSize + '">');
            moveCloud($('#leftcloud' + i), placeX, placeY);
        }
        // setTimeout(fadeInClouds, 19000);

        clearClouds();
        int1 = setInterval(scatterClouds, cloudCycle);
    };

    fadeInClouds = function(){
        cloudContainer.transition({
            opacity: '1'
        }, 2000);
    };

    
    newPos = function(){
        var frameX = $(window).width();
        var frameY = $(window).height();
        var placeX, placeY;
        placeX = (Math.floor(Math.random() * frameX)) + 'px';
        placeY = (Math.floor(Math.random() * frameY)) + 'px';
        return [placeX, placeY];
    };

    //which direction are these clouds moving?
    posNeg = function(){
        var sign = Math.floor(Math.random() * 2);
        if (sign >= 1){
            return '';
        }
        else{
            return '-';
        }
    };

    moveCloud = function(cloud, placeX, placeY){
        var movement = newPos();
        var neg = posNeg();
        cloud.transition({
            x: neg + movement[0],
            y: neg + movement[1]
        }, 90000, function(){
            cloud.remove();
        });
    };

    storage = function(artist, twitter){
        if(typeof(Storage)!=="undefined"){
            localStorage.artist = artist;
            localStorage.twitter = twitter;
        }
    };

    //add the first song/video
    addMedia = function(){
        //get a random media object
        var m = ranMedia();
        //plug in media
        newMedia(m.video, m.song);
        var artist = m.artist;
        var link = m.link;
        var twitter = m.twitterUser;
        //update globally what artist we are dealing with here
        globalArtist = artist;
        globalLink = link;
        if (!desktop){
                wrapper.css({
                    background: 'url("//d3qcuxqrj7wgbi.cloudfront.net/images/' + m.img + '.jpg") no-repeat center center',
                    backgroundSize: 'cover'
                });
        }
        //call video object
        var videoScreen = document.getElementById('screen');
        //update artist names, links from media object into nav
        //change info
        updateMarquee(link, m.zone, m.title, artist);
        //store artist name to local storage  
        storage(artist, twitter);
        return videoScreen;
    };


    //video carousel
    changeMedia = function(direction){
        if (direction === 'left'){
            if (currentMedia < 0){
                currentMedia = media.length - 1; //account for zero index
            }
            pkg = media[currentMedia];
            //plug in new media
            newMedia(pkg.video, pkg.song);
            artist = pkg.artist;
            image = pkg.img;
            globalArtist = artist;
            twitter = pkg.twitterUser;
            link = pkg.link;
            globalLink = link;
            share.find('#globalartist').empty().text(artist);
            share.find('#globallink').attr('href', globalLink);
            
            if (!desktop){
                wrapper.css({
                    background: 'url("//d3qcuxqrj7wgbi.cloudfront.net/images/' + pkg.img + '.jpg") no-repeat center center',
                    backgroundSize: 'cover'
                });
            }
            //change info
            updateMarquee(link, pkg.zone, pkg.title, artist);
            //store artist name to local storage  
            storage(artist, twitter);
            //update twitter share
            insertTweet();
            var videoScreen = document.getElementById('screen');
            song = document.getElementsByTagName('audio')[0];
            videoScreen.play();
                
        }
        if (direction === 'right'){
            if (currentMedia > media.length - 1){ //acount for zero index
                currentMedia = 0;
            }
            pkg = media[currentMedia];
            //plug in the new media
            newMedia(pkg.video, pkg.song);
            artist = pkg.artist;
            globalArtist = artist;
            link = pkg.link;
            globalLink = link;
            twitter = pkg.twitterUser;
            //update global artist in text
            share.find('#globalartist').empty().text(artist);
            share.find('#globallink').attr('href', globalLink);
            
            if (!desktop){
                wrapper.css({
                    background: 'url("//d3qcuxqrj7wgbi.cloudfront.net/images/' + pkg.img + '.jpg") no-repeat center center',
                    backgroundSize: 'cover'
                });
            }
            //change info
            updateMarquee(link, pkg.zone, pkg.title, artist);
            //store artist name to local storage  
            storage(artist, twitter);
            //update twitter share
            insertTweet();
        }
        videoScreen = document.getElementById('screen');
        videoScreen.play();
        
    };

    newMedia = function(video, song){
        var width = $(window).width();
        var height = $(window).height();
        var ratio = width / height;

        if (ratio < 1.8 && ratio >= 1.5){
            width = width * 1.2;
        }
        else if (ratio < 1.5 && ratio >= 1.27){
            width = width * 1.4;
        }

        else if (ratio < 1.27 && ratio > 1.12){
            width = width * 1.6;
        }
        else if (ratio < 1.12){
            width = width * 1.8;
        }
        else if (ratio < 1){
            width = width * 2.2;
        }
        
        else{
            width = width;
            height = height;
        }


        newVideo = prefix + video + '.mp4';
        newVideoWebM = prefix + video + '.webm';
        audio = prefix + song + '.mp3';
        audioOgg = prefix + song + '.ogg';

        $('#song').empty().html('<audio loop id="radio"><source src="' + audio + '" type="audio/mpeg">' +
        '<source src="' + audioOgg + '"type="audio/ogg">Your browser does not support the audio element.</audio>');
                
        $('#video').html('<video id="screen" width="' + width +'"  loop muted>' +
        '<source src="' + newVideoWebM + '" type="video/webm">' +
        '<source src="' + newVideo + '" type="video/mp4"></video>');

        centerVid($('#screen'), width);
    };

    updateMarquee = function(link, zone, title, artist, speed){
        song = document.getElementsByTagName('audio')[0];
        nowPlaying.find('span.artist').html('<a href="' + link + '" target="_blank">' + artist + '</a>');
        nowPlaying.find('span.zone').text(zone);
        nowPlaying.find('span.song').text(title);
        if (nowPlaying.hasClass('song-playing')){
            song.play();
        }
        else{
            return;
        }
    };

    insertTweet = function(){
        var text = '"' + tweet() + '."' + ' Enter EternalBliss™';
        var pre = "http://twitter.com/share?text=";
        var post;
        var url = "&url=http://daily.redbullmusicacademy.com/specials/eternal-bliss/";
        var hashtag = "&hashtags=rbma";
        var artist = ' @' + localStorage.twitter;
        //strips the trailing slash
        var source = "&;source=webclient";
        var finalTweet = pre+text+artist+url+hashtag+source;
        $('#twitter').attr('href', finalTweet);
    };

    verb = function(){
        var v_ran = Math.floor(Math.random() * verbs.length);
        return '<a href="#" data-type="verb">' + verbs[v_ran] + '</a>';
    };

    adverb = function(){
        var a_ran = Math.floor(Math.random() * adverbs.length);
        return '<a href="#" data-type="adverb">' + adverbs[a_ran] + '</a>';
    };

    adjective = function(){
        var aa_ran = Math.floor(Math.random() * adjectives.length);
        return '<a href="#" data-type="adjective">' + adjectives[aa_ran] + '</a>';
    };

    noun = function(){
        var n_ran = Math.floor(Math.random() * nouns.length);
        return '<a href="#" data-type="noun">' + nouns[n_ran] + '</a>';
    };

    bodypart = function(){
        var b_ran = Math.floor(Math.random() * bodyparts.length);
        return '<a href="#" data-type="bodypart">' + bodyparts[b_ran] + '</a>';
    };

    state = function(){
        var s_ran = Math.floor(Math.random() * states.length);
        return '<a href="#" data-type="state">' + states[s_ran] + '</a>';
    };

    movement = function(){
        var m_ran = Math.floor(Math.random() * move_verbs.length);
        return '<a href="#" data-type="movement">' + move_verbs[m_ran] + '</a>';
    };

    function location(){
        var l_ran = Math.floor(Math.random() * locations.length);
        return '<a href="#" data-type="location">' + locations[l_ran] + '</a>';
    }

    sense = function(){
        var sns_ran = Math.floor(Math.random() * senses.length);
        return '<a href="#" data-type="sense">' + senses[sns_ran] + '</a>';
    };

    plural_v = function(){
        var p_ran = Math.floor(Math.random() * plural_verbs.length);
        return '<a href="#" data-type="plural_v">' + plural_verbs[p_ran] + '</a>';
    };

    ing_v = function(){
        var i_ran = Math.floor(Math.random() * ing_verbs.length);
        return '<a href="#" data-type="ing_v">' + ing_verbs[i_ran] + '</a>';
    };

    way = function(){
        var w_ran = Math.floor(Math.random() * ways.length);
        return '<a href="#" data-type="way">' + ways[w_ran] + '</a>';
    };

    trait = function(){
        var ran_trait = Math.floor(Math.random() * traits.length);
        return '<a href="#" data-type="trait">' + traits[ran_trait] + '</a>';
    };

    preposition = function(){
        var prep_ran = Math.floor(Math.random() * prepositions.length);
        return '<a href="#" data-type="preposition">' + prepositions[prep_ran] + '</a>';
    };

    color = function(){
        var c_ran = Math.floor(Math.random() * colors.length);
        return '<a href="#" data-type="color">' + colors[c_ran] + '</a>';
    };

    thought_state = function(){
        var t_ran = Math.floor(Math.random() * thought_states.length);
        return '<a href="#" data-type="thought-state">' + thought_states[t_ran] + '</a>';
    };

    tweet = function(){
        var ran_tweet = Math.floor(Math.random() * tweets.length);
        return tweets[ran_tweet];
    };

    statement = function(){
        var ran_statement = Math.floor(Math.random() * statements.length);
        return '<a href="#" data-type="statement">' + statements[ran_statement] + '</a>';
    };

    past_verb = function(){
        var ran_pverb = Math.floor(Math.random() * past_verbs.length);
        return '<a href="#" data-type="past_verb">' + past_verbs[ran_pverb] + '</a>';
    };

    badNoun = function(){
        var ran_bnoun = Math.floor(Math.random() * badNouns.length);
        return '<a href="#" data-type="badNoun">' + badNouns[ran_bnoun] + '</a>';
    };

    stateNoun = function(){
        var ran_stateNoun = Math.floor(Math.random() * stateNouns.length);
        return '<a href="#" data-type="stateNoun">' + stateNouns[ran_stateNoun] + '</a>';
    };

    practice = function(){
        var ran_practice = Math.floor(Math.random() * practices.length);
        return '<a href="#" data-type="practice">' + practices[ran_practice] + '</a>';
    };





    makePoem = function(cycles){
            
        a = '<p>' + capitalize(adverb())  + ' bring your ' + bodypart() + ' back to the ' + noun() + '.</p>';


        b = '<p>You are now ' + adverb() + ' ' + state() + ' and ' + state() +
            '. ' + "It's now time to " + movement() + " back inside your mind's " +
            location() + '.</p>';

        c = '<p>' + capitalize(adverb()) + ' begin to ' + movement() +' through the ' + noun() + '.</p>';

        d = '<p>As your ' + bodypart() + ' notices how ' +
            adjective() + ' your ' + bodypart() + ' feels, notice how ' + adjective() + ' your entire body feels.</p>';

        e = '<p>As you ' + movement() + ' to the ' + noun() +
            ', the ' + sense() + ' of ' + trait() + ' causes you to ' + verb() + '.</p>';

        f = '<p>The entire universe is currently ' + ing_v() + ' with energy, and increasing each year. ' +
            'Hold this close to your ' + bodypart() + ' and never forget its significance.</p>';

        g = '<p>Please ' + movement() + ' to the spirit of the ' + noun() + '. ' +
            'Your ' + trait() + ' is still ' + ing_v() + ' for you.</p>';

        h = '<p>Understand yourself, and ' + verb() + ' the ' +
            way() + ' back to your ' + trait() + '.</p>';

        i = '<p>' + capitalize(movement()) + ' to the proverbial ' + location() +
            ' and ' + verb() +  sp + preposition() + sp + 'the' +
            sp + noun() + '.</p>';

        j = '<p>You feel ' + state() + ' and ' + state() + '.' +
            sp + 'You know that your ' + noun() + ' will bring you home safely.</p>';

        k = '<p>Your ' + way() + ' is ' + adjective() +
            ' and ' + adjective() + '. ' + 'Like the ' + noun() +
            ' which resides in your life... It is ' + adjective() + ' and ' + state() + '.</p>';

        l = '<p>' + capitalize(verb()) + ' and ' + verb() + ' the ' +
            noun() + ' to guide you.</p>';

        m = '<p>' + capitalize(movement()) + ' out of the ' + noun() +
            ' and into the ' + trait() + '.</p>';

        n = '<p>' + capitalize(adverb()) + ' become aware of the ' + location() +
            ' in which you ' + movement() + ' each waking hour.</p>';
            
        o = '<p>Begin to sense the ' + noun() + ' around you. Breathe ' +
            preposition() + ' it, and become aware of the rise and fall of your ' + bodypart() +
            ', its coming and going, and its ' + adjective() + ' sensation.</p>';

        p = '<p>' + capitalize(verb()) + ' on your root chakra at the base of your ' +
            bodypart() + ' and visualize a vibrant ' + color() + ' light, or if you prefer, imagine a ' +
            color() + sp + noun() + '.</p>';

        q = '<p>This ' + noun() + ' brings a healthy ' + trait() + ' in your life. Feel it ' + verb() + ' you as it ' + plural_v() + ' you towards the ' + location() + '.</p>';

        r = "<p>You're " + state() + ', ' + state() + ' and ' + state() + '.</p>';

        s = '<p>Breathe the color ' + color() + ' in and out and see yourself ' + state() + '. Your ' +
            adjective() + ' ' + trait() + ' allows you to feel ' + state() + ' and ' +
            state() + '.</p>';

        t = '<p>Feel how good if feels to have all the ' + trait() + ' you need to do all the ' + ing_v() + ' necessary.</p>';

        u = '<p>You feel so ' + state() + ' for this ' + adjective() + sp + noun() +' that ' + plural_v() +
            ' so ' + adverb() + ', ' + adverb() + ' and ' + plural_v() + ' so ' +
            adverb() + '.</p>';


        w = '<p>Now let this ' + adjective() + sp + color() + sp + trait() + ' continue to ' +
            verb() + ' and ' + verb() + ' as you move up to your ' + bodypart() + ' chakra, ' +
            'located ' + preposition() + ' your ' + bodypart() + ' and your ' + bodypart() + '.</p>';

        x = '<p>Make small ' + adjective() + ' circles with your ' + bodypart() + '.</p>';

        y = '<p>Allow a sensation of ' + trait() + ' to slowly fill your ' + bodypart() + ' as a ripple of ' + color() + '.</p>';

        z = '<p>Extend ' + adverb() + ' out through your ' + bodypart() + ' and breathe out the toxic energy.</p>';

        aa = '<p>Clasp the spirit of the ' + state() + ' ' + trait() + ' and levitate until you find yourself on the ' + past_verb() + ' ' + way() + '.</p>';

        bb = '<p>Hold your hands five centimetres away from your ' + bodypart() + ' and give a litle blast of ' +
            color() + ' light. Notice the opening that you have created in your ' + bodypart() + ' using just your hands.</p>';

        cc = '<p>Note the ' + state() + ' state that permeates your being.</p>';

        dd = '<p>Rest your ' + bodypart() + ' on your ' + bodypart() + ' and bow to your ' + adjective() + ' ' + noun() + '.</p>';

        ee = '<p>Have you discovered your ' + way() + '?</p>';

        ff = '<p>In order to fully ' + verb() + ', one must utterly transcend the ' + badNoun() + '.</p>';

        gg = '<p>Only by ' + ing_v() + ' into the ' + badNoun() + ' and facing it, can you truly begin to heal.</p>';

        hh = '<p>Allow the ' + noun() + ' deep within yourself to ' + verb() + ' the ' + noun() + ' in your ' + bodypart() + '.</p>';

        ii = '<p>All encounters in our livelihood, whether favorable or unfavorable, are just reflections of our own ' + adjective() + ' ' + bodypart() + '.</p>';

        jj = '<p>It is time to understand that we are the ' + adjective() + ' masters we have been waiting for.</p>';

        kk = '<p>The ' + trait() + ' (feminine receiver) and the ' + trait() + ' (male transmitter) will unite as one unit.</p>';

        ll = '<p>Your daily ' + practice() + ' practice will benefit you in a time of great need.</p>';

        mm = '<p>Imagine the buddha-head hovering like a divine remote control. As you ' + adverb() + ' gaze towards the cloudy ' + badNoun() + ' that is playing on the TV set, the image is replaced by a vibrant hologram of ' + practice() + ' representing your ' + trait() + '.</p>';

        nn =  "<p>Don't forget that you yourself contain the seed of " + adjective() + ' grace, like an endless ' + location() + '.</p>';

        oo =  '<p>You must tend the ' + adjective() + ' garden that is sprouting inside your Platonic ' + noun() + ' and water it ' + adverb() + ' with a great outpouring of truth.</p>';

        pp =  '<p>This circle represents your ' + adjective() + ' nook. Step inside it and feel your problems ' + movement() + ' towards the ' + color() + ' horizon.</p>';

        qq = '<p>Realise your ' + adjective() + ' potential by inserting your ' + bodypart() + ' into the conversation.</p>';

        rr = '<p>Wake up and smell the turmeric tea. You are about to realise your ' + ing_v() + ' potential. A new day has begun with a new ' + way() + '.</p>';

        ss = '<p>You are Vishnu’s child. While you may be currently feeling  ' + state() + ', your higher self is simultaneously ' + state() + '.</p>';

        tt =  '<p>Do not forget that you yourself contain the seed of ' + adjective() + ' grace, like an endless ' + location() + '.</p>';

        uu = '<p>Greet yourself, and grant yourself this ' + color() + '-toned moment. You are about to manifest your ' + thought_state()+ ' self.</p>';

        vv = '<p>' + capitalize(movement()) + ' quickly now, to the peak of the mountain, leaving the steep slopes of ' + badNoun() + ' behind. The moon casts its beams on your ' + ing_v() + ' ' + bodypart() + '.</p>';


        st1 = '<p>' + statement() + '.</p>';

        st2 = '<p>' + statement() + '.</p>';

        st3 = '<p>' + statement() + '.</p>';

        st4 = '<p>' + statement() + '.</p>';

        st5 = '<p>' + statement() + '.</p>';

        st6 = '<p>' + statement() + '.</p>';

        st7 = '<p>' + statement() + '.</p>';

        st8 = '<p>' + statement() + '.</p>';

        st9 = '<p>' + statement() + '.</p>';

        st10 = '<p>' + statement() + '.</p>';

        var collection = [a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,
                        w,x,y,z,aa,bb,cc,dd,ee,ff,gg,hh,ii,jj,kk,ll,
                        mm,nn,oo,pp,qq,rr,ss,tt,uu,vv,
                        st1,st2,st3,st4,st5,st6,st7,st8, st9, st10];


        //shuffle the order
        collection = shuffle(collection);

        //double it
        
        return collection;
        
    };






    insertPoems = function(time){
        

        var cycles = time / 5; //approx 5 lines per minute
        if (time === '70'){
            time = 'Infinite';
            //if this is the first time we've been around, add the date
            if (infiniteCounter === 0){
                poems.prepend("<h2>Today's " + time + " Session<br>" + today + "</h2>");
            }
        }
        else{
            poems.prepend("<h2>Today's " + time + " Minute Session<br>" + today + "</h2>");
        }

        //if this is a one minute session, get rid of the opening paragraph
        if (time === '1'){
            poems.find('p.intro').hide();
            poems.find('p.intro-short').show();
            poems.append(makePoem(cycles));
        }
            else{
               for ( var i=0; i < cycles; i++){
                    poems.append(makePoem(cycles));
                }
            }

            
            share.find('#globallink').attr('href', globalLink);
            share.find('#globalartist').text(globalArtist);

            
            //add class of 'first-word' to first link in sentence 
            poems.find('p').each(function(){

                //make a reference to this
                var thisSentence = $(this);
                
                //grab all text including <a> tags
                var n = $(this).html();

                //turn to string
                n = n.toString();

                //if first character is <, means we have an <a> tag
                //make sure ONLY first-word class is added on sentences with leading a
                if(n.charAt(0) === '<'){
                    thisSentence.children('a').first().addClass('first-word');
                }
            });

            movePoems(calculateElementHeight(), cycles);

        };

        capitalize = function(str){

            //find end of <a> tag
            var n = str.indexOf('>');
            //grab sentence up to character to replace
            var firstBit = str.slice(0, n+1);
            //convert
            var upper = str.charAt(n+1).toUpperCase();
            //remaining bit
            var rest = str.slice(n+2);
            var newString = firstBit + upper + rest;


            return newString;
 
        };

        



        //get height of poem text element
        calculateElementHeight = function(){
            var rect = document.getElementById("poems").getBoundingClientRect();
            if (rect.height){
                elementHeight = rect.height;
            }
            else{
                elementHeight = rect.bottom - rect.height; //derive height
            }
            return elementHeight;

        };

        movePoems = function(poem_height, cycles){
            scrollSpeed = poem_height * 50;
            //needs to move slower on mobile
            if(!desktop){
                scrollSpeed = poem_height * 75;
            }

                poems.addClass('is-animating');
                poems.transition({
                    y: '-' + poem_height + 'px'
                }, scrollSpeed, 'linear', function(){
                    poems.css({
                        marginTop: '35%',
                        marginBottom: '150%'
                    });
                    insertPoems(70);
                });
        };

        audioState = function(button){
            //if we have started the poems
            if (poems.hasClass('is-animating')){
                if (button.hasClass('playing')){
                    nowPlaying.removeClass('song-playing').addClass('song-muted');
                    button.hide();
                    song.pause();
                    button.parent().parent().find('.muted').show();
                }
                else if (button.hasClass('muted')){
                    nowPlaying.removeClass('song-muted').addClass('song-playing');
                    button.hide();
                    song.play();
                    button.parent().parent().find('.playing').show();
                }

            }
            //if we are on the title page
            else{
                return;
            }
            
        };


        changeWords = function(grammar, word){
            switch(grammar){
                
                case 'bodypart':
                    if (word.hasClass('first-word')){
                    word.html(capitalize(bodypart()));
                    }
                    else{
                       word.html(bodypart());
                    }
                    break;
                
                case 'noun':
                    if (word.hasClass('first-word')){
                        word.html(capitalize(noun()));
                    }
                    else{
                       word.html(noun());
                    }
                    break;

                case 'verb':
                    if (word.hasClass('first-word')){
                        word.html(capitalize(verb()));
                    }
                    else{
                       word.html(verb());
                    }
                    break;

                case 'adjective':
                     if (word.hasClass('first-word')){
                        word.html(capitalize(adjective()));
                    }
                    else{
                       word.html(adjective());
                    }
                    break;

                case 'way':
                     if (word.hasClass('first-word')){
                        word.html(capitalize(way()));
                    }
                    else{
                       word.html(way());
                    }
                    break;

                case 'trait':
                     if (word.hasClass('first-word')){
                        word.html(capitalize(trait()));
                    }
                    else{
                       word.html(trait());
                    }
                    break;

                case 'location':
                    if (word.hasClass('first-word')){
                        word.html(capitalize(location()));
                    }
                    else{
                       word.html(location());
                    }
                    break;

                case 'sense':
                     if (word.hasClass('first-word')){
                        word.html(capitalize(sense()));
                    }
                    else{
                       word.html(sense());
                    }
                    break;

                case 'movement':
                    if (word.hasClass('first-word')){
                        word.html(capitalize(movement()));
                    }
                    else{
                       word.html(movement());
                    }
                    break;

                case 'plural_v':
                    if (word.hasClass('first-word')){
                        word.html(capitalize(plural_v()));
                    }
                    else{
                       word.html(plural_v());
                    }
                    break;

                case 'ing_v':
                    if(word.hasClass('first-word')){
                        word.html(capitalize(ing_v()));
                    }
                    else{
                        word.html(ing_v());
                    }
                    break;

                case 'adverb':
                    if (word.hasClass('first-word')){
                        word.html(capitalize(adverb()));
                    }
                    else{
                       word.html(adverb());
                    }
                    break;

                case 'state':
                    if (word.hasClass('first-word')){
                        word.html(capitalize(state()));
                    }
                    else{
                       word.html(state());
                    }
                    break;

                case 'color':
                    if (word.hasClass('first-word')){
                        word.html(capitalize(color()));
                    }
                    else{
                       word.html(color());
                    }
                    break;

                case 'thought-state':
                    if (word.hasClass('first-word')){
                        word.html(capitalize(thought_state()));
                    }
                    else{
                       word.html(thought_state());
                    }
                    break;
                case 'past_verb':
                    if (word.hasClass('first-word')){
                        word.html(capitalize(past_verb()));
                    }
                    else{
                        word.html(past_verb());
                    }
                    break;

                case 'badNoun':
                    if (word.hasClass('first-word')){
                        word.html(capitalize(badNoun()));
                    }
                    else{
                        word.html(badNoun());
                    }
                    break;

                case 'practice':
                    if (word.hasClass('first-word')){
                        word.html(capitalize(practice()));
                    }
                    else{
                        word.html(practice());
                    }
                    break;

                case 'stateNoun':
                    if (word.hasClass('first-word')){
                        word.html(capitalize(stateNoun()));
                    }
                    else{
                        word.html(stateNoun());
                    }
                    break;
                


                case 'statement':
                    word.html(statement());
                    break;

                default:
                    return;
            }

        };

        slowDown = function(){
            if (speedCounter > 1){
                var downSpeed;
                speedCounter--;
                if (speedCounter === 3){
                    textSpeed = 'fast';
                    downSpeed = scrollSpeed * 0.25;
                }
                else if (speedCounter === 2){
                    textSpeed = 'normal';
                    downSpeed = scrollSpeed;
                            
                }
                else if (speedCounter === 1){
                    textSpeed="slow";
                    downSpeed = scrollSpeed * 3;
                            
                }
                nowPlaying.find('span.speed').text(textSpeed);
                poem_height = calculateElementHeight();
                if (poems.hasClass('infinite')){
                    poems.stop().transition({
                        y: -(poem_height - (poems.offset().top)) + 'px'
                    }, downSpeed, 'linear', function(){
                        poems.css({
                            marginTop: '35%',
                            marginBottom: '150%'
                        });
                        infiniteCounter++;
                        insertPoems(70);
                    });
                }
                else{
                    poems.stop().transition({
                        y: -(poem_height - (poems.offset().top)) + 'px'
                    }, downSpeed, 'linear');
                }
            }
        };



        speedUp = function(){
            if (speedCounter < 3){
                speedCounter++;
                        
                var upSpeed;
                if (speedCounter === 3){
                    textSpeed = 'fast';
                    upSpeed = scrollSpeed * 0.25;
                            
                }
                else if (speedCounter === 2){
                    textSpeed = 'normal';
                    upSpeed = scrollSpeed;
                            
                }
                else if (speedCounter === 1){
                    textSpeed="slow";
                    upSpeed = scrollSpeed * 3;
                            
                }
                nowPlaying.find('span.speed').text(textSpeed);
                poem_height = calculateElementHeight();
                        
                if (poems.hasClass('infinite')){
                    poems.stop().transition({
                        y: -(poem_height - (poems.offset().top)) + 'px'
                    }, upSpeed, 'linear', function(){
                        poems.css({
                            marginTop: '35%',
                            marginBottom: '150%'
                        });
                        infiniteCounter++;
                        insertPoems(70);
                    });
                }
                else{
                    poems.stop().transition({
                        y: -(poem_height - (poems.offset().top) + 300) + 'px'
                    }, upSpeed, 'linear');
                }

            }
        };


        dimArrows = function(arrow){
            arrow.transition({
                opacity: 0.5
            }, 200).transition({
                opacity: 1
            }, 200);

        };

    
        //ARROW KEYS
        document.onkeydown = function(event) {
            switch (event.keyCode) {
                case 37:
                    currentMedia--;
                    changeMedia('left');
                    dimArrows(arrows.find('.aleft'));
                    
                    break;
                case 39:
                    currentMedia++;
                    changeMedia('right');
                    dimArrows(arrows.find('.aright'));
                    
                    break;
                case 38:
                    //up arrow. faster
                    if (!poems.hasClass("animation-ended")){
                        speedUp();
                    }
                    
                    dimArrows(arrows.find('.atop'));
                    break;
                case 40:
                    //down arrow. slower
                    if (!poems.hasClass("animation-ended")){
                        slowDown();
                    }
                    dimArrows(arrows.find('.abottom'));
                    break;
                case 13:
                    $('.submit').trigger('click');
            }
        };

        endPoems = function(time){
            if(time !== '70'){
                //make sure time is integer + radix parameter
                time = parseInt(time,10);

                //turn time into ms
                var end = time * 60000;

                //function to stop poem
                setTimeout(function(){

                    poems.stop().addClass('animation-ended').fadeOut().remove();
                    share.delay(1000).fadeIn();

                }, end);


            }
        };

        

        mobileInit = function(time, button){
            insertPoems(time);
            endPoems(time);
            song = document.getElementsByTagName('audio')[0];
            //make sure poems are visible
            poems.css({
                opacity: 1
            });
            //fade out submit button
            button.fadeOut();
            //fade out header title
            $('#title').fadeOut();
            
            song.play();
            nowPlaying.find('.marquee').css({
                opacity: 1
            });

            nowPlaying.find('.playing').show();
            nowPlaying.addClass('song-playing');
            currentDeets.fadeIn();
            arrows.fadeIn();
            cloudContainer.fadeOut(1000);
            setTimeout(moveBackClouds, 2000);
        };

        deskInit = function(time, button){
            song = document.getElementsByTagName('audio')[0];
            insertPoems(time);
            endPoems(time);
            //make sure poems are visible
            poems.css({
                opacity: 1
            });
            button.fadeOut('4000');
            $('#startvideo').fadeOut();
            $('#title').fadeOut();

            //get rid of start video
            startVid = document.getElementById('startscreen');
            startVid.pause();
            startVid.remove();

            //kick off media
            song.play();
            $('#video').addClass('playing');
            videoScreen = document.getElementById('screen');
            videoScreen.play();

            //add and update marquee
            nowPlaying.find('.marquee').css({
                opacity: 1
            });
            nowPlaying.find('.playing').show();
            nowPlaying.addClass('song-playing');
            currentDeets.fadeIn();
            arrows.fadeIn();
            $('#container').remove();

            //get rid of clouds
            cloudContainer.fadeOut(4000);
            setTimeout(moveBackClouds, 5000);

        };



        $('#poems').on('click', 'a', function(e){
            e.preventDefault();

            var grammar = $(this).data('type');
            var word = $(this);

            changeWords(grammar, word);
            
            
        });



        //Speed up slow down text
        arrows.find('a').on('click', function(e){
            e.preventDefault();
            var arrow = $(this).attr('class');
            if (arrow === 'atop'){
                if (!poems.hasClass("animation-ended")){
                    speedUp();
                }
            }
            if (arrow === 'abottom'){
                if (!poems.hasClass("animation-ended")){
                    slowDown();
                }
            }
            if (arrow === 'aleft'){
                currentMedia--;
                changeMedia('left');
            }
            if (arrow === 'aright'){
                currentMedia++;
                changeMedia('right');
            }
        });



        //CAROUSEL NAV
        $('#select-l').on('click', 'img', function(){
            currentMedia--;
            changeMedia('left');
                
        });

        $('#select-r').on('click', 'img', function(){
            currentMedia++;
            changeMedia('right');
                
        });

        //audio on and off
        nowPlaying.find('.audio-button').on('click', function(){
            //send in reference to mute/play button
            audioState($(this));
        });


        $('#logo').on('click', function(e){
            e.preventDefault();
            window.location.reload();
        });


        $('#relax').submit(function(e){
            e.preventDefault();
            time = $("input:radio[name=time]:checked").val();

            if (time === '70'){
                poems.addClass('infinite');
            }

            var name = $('#name').val();
            
            if(!desktop) {
                mobileInit('60', $(this));
            }

            else{
                deskInit(time, $(this));
            }

        });

        //DETECT SWIPES
        $('#wrapper').swipe({
            swipe:function(event, direction, distance, duration, fingerCount){
                if(direction === 'left'){
                    currentMedia--;
                    changeMedia('left');
                }
                else if(direction === 'right'){
                    currentMedia++;
                    changeMedia('right');
                }
                else if(direction === 'up'){
                    if (!poems.hasClass("animation-ended")){
                        speedUp();
                    }
                }
                else if (direction === 'down'){
                   if (!poems.hasClass("animation-ended")){
                        slowDown();
                    }
                }
            },
            threshold: 45
        });



        $('nav').find('.social .question').click(function(){
            $('#about').transition({
                top: 0
            }, 500);
        });

        $('#about').find('#close').click(function(){
            $('#about').transition({
                top: '-100%'
            }, 500);
        });

        share.find('.exit a').click(function(){
            share.fadeOut();
            poems.fadeOut();
        });





        $('.marquee').marquee({
              //speed in milliseconds of the marquee
              duration: 30000,
              //gap in pixels between the tickers
              gap: 50,
              //time in milliseconds before the marquee will start animating
              delayBeforeStart: 0,
              //'left' or 'right'
              direction: 'left',
              //true or false - should the marquee be duplicated to show an effect of continues flow
              duplicated: true
        });

        //OK SHADOW PLUGIN

        $('#title-text').okshadow();
        $('#title-text').data('okshadow').setoption({
            'textShadow': true,
            'color' : '#00b4ff',
            'fuzzMax' : 10,
            'fuzzMin' : 1,
            'xMax': 45,
            'yMax': 45,
        });


}); //end doc ready