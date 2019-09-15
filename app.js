// module imports
var mongoose       = require('mongoose'),
    _              = require('lodash'),
    bodyParser     = require('body-parser'),
    express        = require('express'),
    app            = express(),
    Quote          = require('./models/quote'),
    Font          = require('./models/fonts');

// app config
mongoose.connect('mongodb://localhost/quote_blog');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// root - redirect to quotes page
app.get('/', function(req, res){
    res.render('index');
});

// show all quotes
app.get('/quotes', function(req, res){
    // get all quotes from db
    Quote.find({}, function(err, allQuotes){
        if(err){
            console.log(err);
        } else {
            // render recieved quotes
            res.render('quotes', {
                allQuotes: allQuotes
            });
        }
    });
});

// add new quote to db
app.post('/quotes', function(req, res){
    //get quote from form
    var quote = req.body.quote;
    //add to db
    Quote.create(quote, function(err, newQuote){
        if(err){
            console.log(err);
        } else {
            // redirect to success
            res.redirect('quotes/success');
        }
    });
});

app.get('/quotes/success', function(req, res){
    res.render('success');
});

// show create form
app.get('/quotes/create', function(req, res){
    res.render('create');
});

// show specific quote
app.get('/quotes/:id', function(req, res){
    var quoteId = req.params.id;
    // random number for background image
    var randomNumber = _.random(0,50);
    console.log(randomNumber);
    // random number for font
    var randomFont = _.random(1,8);
    console.log(randomFont);
    console.log('Font:' + Font['1']);
    var fontName = '';
    switch(randomFont){
        case 1:
            fontName = Font['1']; break;
        case 2:
            fontName = Font['2']; break;
        case 3:
            fontName = Font['3']; break;
        case 4:
            fontName = Font['4']; break;
        case 5:
            fontName = Font['5']; break;    
        case 6:
            fontName = Font['6']; break;  
        case 7:
            fontName = Font['7']; break;  
        case 8:
            fontName = Font['8']; break;  
        default:
            fontName = 'Segoe UI';
    }
    console.log(fontName);
    Quote.findById(quoteId, function(err, foundQuote){
        if(err){
            console.log(err);
        } else {
            res.render('show', {
                quote: foundQuote,
                randomNumber: randomNumber,
                fontName: fontName
            });
        }
    });
});

app.get('/about', function(req, res){
    res.render('about');
});

app.listen(3000, '127.0.0.1', function(){
    console.log('Server started');
});