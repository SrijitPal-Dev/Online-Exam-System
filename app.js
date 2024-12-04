import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import session from 'express-session';
import { v4 as uuidv4 } from 'uuid';

const uri = 'mongodb+srv://srijitsocial:LkRqtfaUEmUAzFL6@cluster0.7xfgr.mongodb.net/FirstProj?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Connection error:', err));


const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    category: { type: String, required: true },
    rollNumber: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    attemptedQuizzes: [
        {
            quizId: { type: String, required: true }, // Unique ID of the quiz
            score: { type: Number, required: true }, // Marks obtained in the quiz
            totalScore: { type: Number, required: true }, // Total marks for the quiz
            subject: { type: String, required: true } // Subject of the quiz
        }
    ],
});

const User = mongoose.model('User', userSchema);

const questionSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true },
});

// Create a Question model
const Question = mongoose.model('Question', questionSchema);

const ScheduleSchema = new mongoose.Schema({
    quizId: { type: String, required: true, unique: true, default: uuidv4 }, // Generate quizId using uuidv4
    subject: { type: String, required: true },
    questions: { type: Number, required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true }
});

const Schedule = mongoose.model('Schedule', ScheduleSchema);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/sign-up', (req, res) => {
    res.render('sign-up');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/homepage', async (req, res) => {
    try {
        const userId = req.session.userId; // User ID from session

        const user = await User.findById(userId);

        if (user.category === 'student') {
            return res.redirect('/list');
        } else if (user.category === 'teacher') {
            return res.redirect('/teacher-dashboard');
        } else {
            return res.status(400).send('Invalid user category'); // Handle unexpected category
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal server error'); // Generic error message
    }
});


app.get('/performance', async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }

    try {
        const students = await User.find({ category: 'student' }).select('firstName rollNumber');
        res.render('performance', { students });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error while fetching students.');
    }
});

app.post('/signup', async (req, res) => {
    const { firstName, lastName, category, rollNumber, email, password } = req.body;

    try {
        // Check if the email or name already exists in the database
        const existingUserByEmail = await User.findOne({ email: email });
        const existingUserByName = await User.findOne({ firstName: firstName, lastName: lastName });

        // If email or name is already taken, return an error message
        if (existingUserByEmail) {
            return res.render('sign-up', { errorMessage: 'This email is already in use. Please choose another one.' });
        }

        if (existingUserByName) {
            return res.render('sign-up', { errorMessage: 'A user with the same name already exists. Please use a different name.' });
        }

        // Create a new user object
        const newUser = new User({
            firstName,
            lastName,
            category,
            rollNumber: category === 'student' ? rollNumber : null,
            email,
            password
        });

        // Save the new user to the database
        await newUser.save();

        // Redirect to the login page after successful signup
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error saving user. Please try again.');
    }
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email, password: password });

        if (user) {
            req.session.userId = user._id;
            req.session.category = user.category;

            if (user.category === 'teacher') {
                req.session.teacherName = user.firstName + ' ' + user.lastName;
                res.redirect('/teacher-dashboard');
            } else {
                req.session.studentName = user.firstName + ' ' + user.lastName; // Store student name in session
                res.redirect('/list'); // Redirect to the list route
            }
        } else {
            res.render('login', { errorMessage: 'Invalid email or password.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error.');
    }
});


// Handle question submission
app.post('/submit-question', async (req, res) => {
    console.log(req.body); // Log the request body for debugging
    const { subject, question, option1, option2, option3, option4, correctAnswer } = req.body;

    const newQuestion = new Question({
        subject,
        question,
        options: [option1, option2, option3, option4],
        correctAnswer,
    });

    try {
        await newQuestion.save();
        res.redirect('/upload');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error saving question. Please try again.');
    }
});

app.get('/exam', async (req, res) => {
    const quizId = req.query.quizId; // Unique quiz identifier from query
    const numberOfQuestions = parseInt(req.query.questions); // Number of questions to fetch
    const userId = req.session.userId; // User ID from session

    if (!quizId || isNaN(numberOfQuestions)) {
        return res.status(400).send('Missing or invalid parameters');
    }

    try {
        // Fetch the user
        const user = await User.findById(userId);
        const quizScores = user.attemptedQuizzes;

        if (!user) {
            return res.status(404).send('User not found.');
        }
        const schedules = await Schedule.find({}).lean();

        // Get the current date and time
        const currentTime = new Date();  // Gets the current local time, we'll convert this to UTC for comparison.

        // Convert current time to UTC for comparison
        const currentTimeUtc = new Date(currentTime.toISOString()); // This gives the UTC time.
        const IST_OFFSET = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
        const currentTimeIST = new Date(currentTimeUtc.getTime() + IST_OFFSET);
        console.log(currentTimeIST);
        const recentSchedules = schedules.filter(schedule => {
            // Create start and end times in UTC by using full date and time (without manually adding 'Z')
            const startTimeUtc = new Date(schedule.startTime); // startTime is already in UTC format, no need to add 'Z' again
            const endTimeUtc = new Date(schedule.endTime); // endTime is already in UTC format, no need to add 'Z' again

            // Compare with the current UTC time
            return currentTimeIST >= startTimeUtc && currentTimeIST <= endTimeUtc;
        });

        // Check if the user has already attempted this quiz
        const alreadyAttempted = user.attemptedQuizzes.some(
            (quiz) => quiz.quizId === quizId
        );

        if (alreadyAttempted) {
            return res.render('list', { errorMessage: 'Exam Already Attempted!', quizScores, recentSchedules, studentName: req.session.studentName });
        }

        // Fetch quiz details from the Schedule collection
        const schedule = await Schedule.findOne({ quizId });

        if (!schedule) {
            return res.status(404).send('Quiz not found.');
        }

        // Fetch random questions for the quiz based on the subject
        const questions = await Question.aggregate([
            { $match: { subject: schedule.subject } },
            { $sample: { size: numberOfQuestions } }
        ]);

        if (!questions.length) {
            return res.status(404).send('No questions found for this quiz.');
        }

        // Render the exam page with questions
        res.render('exam', {
            questions,
            subjectName: schedule.subject,
            quizId: schedule.quizId
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching questions');
    }
});


app.post('/submit', async (req, res) => {
    const quizId = req.body.quizId; // Unique quiz identifier from the form
    const userId = req.session.userId; // User ID from session
    const answers = req.body; // All the selected answers from the form

    if (!quizId || !userId || !answers) {
        return res.status(400).send('Missing parameters');
    }

    try {
        // Fetch the user
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send('User not found.');
        }

        // Check if the user has already attempted this quiz
        if (user.attemptedQuizzes.some(quiz => quiz.quizId === quizId)) {
            return res.status(403).send('You have already attempted this quiz.');
        }

        // Fetch the quiz schedule and questions
        const schedule = await Schedule.findOne({ quizId });
        if (!schedule) {
            return res.status(404).send('Quiz not found.');
        }

        const subject = schedule.subject; // Get the subject of the quiz

        // Fetch the questions for the quiz (using the subject)
        const questions = await Question.find({ subject: subject }).limit(schedule.questions); // Fetch limited number of questions

        // Calculate score
        let score = 0;
        questions.forEach((question, index) => {
            const selectedAnswer = answers[`question${index}`];
            console.log(`Correct Answer for question ${index}:`, question.correctAnswer);
            const selectedOption = Array.isArray(selectedAnswer) ? selectedAnswer[1] : selectedAnswer;
            console.log(`Selected Answer for question ${index}:`, selectedOption);

            if (selectedOption && selectedOption === question.correctAnswer) {
                score += 2; // Correct answer gets 2 points
            }
        });

        const totalScore = questions.length * 2;
        // Mark quiz as attempted for the user
        user.attemptedQuizzes.push({
            quizId: quizId,
            score: score, // Actual score
            totalScore: totalScore, // Total marks for the quiz
            subject: subject // Save subject
        });

        await user.save(); // Save the user's updated attempted quizzes
        console.log(user);
        res.redirect('/list'); // Redirect to the list page after submission

    } catch (error) {
        console.error(error);
        res.status(500).send('Error submitting quiz');
    }
});


app.get('/list', async (req, res) => {
    try {
        // Fetch all schedules from the database
        const schedules = await Schedule.find({}).lean();
        const userId = req.session.userId; // User ID from session
        const user = await User.findById(userId);
        const quizScores = user.attemptedQuizzes;

        const currentTime = new Date();  // Gets the current local time, we'll convert this to UTC for comparison.

        // Convert current time to UTC for comparison
        //const currentTimeUtc = new Date(currentTime.toISOString()); // This gives the UTC time.
        console.log(currentTime)
        const recentSchedules = schedules.filter(schedule => {
            // Create start and end times in UTC by using full date and time (without manually adding 'Z')
            const startTimeUtc = new Date(schedule.startTime); // startTime is already in UTC format, no need to add 'Z' again
            const endTimeUtc = new Date(schedule.endTime); // endTime is already in UTC format, no need to add 'Z' again
            // Compare with the current UTC time
            return currentTime >= startTimeUtc && currentTime <= endTimeUtc;
        });


        console.log(recentSchedules);
        // If no schedules match the current time, pass an empty array
        if (recentSchedules.length === 0) {
            console.log('No exams available at this time');
        }
        // Render the 'list' page with filtered recentSchedules
        res.render('list', { quizScores, recentSchedules, studentName: req.session.studentName });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});



app.get('/teacher-dashboard', (req, res) => {
    if (req.session.category === 'teacher') {
        res.render('t_dashboard', { teacherName: req.session.teacherName });
    } else {
        res.redirect('/login');
    }
});

app.get('/upload', (req, res) => {
    res.render('upload'); // Render upload.ejs page
});

app.get('/schedule', (req, res) => {
    res.render('schedule'); // Render schedule.ejs page
});

// In your server file (e.g., app.js)
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Error logging out");
        }
        res.redirect('/'); // Redirect to the home page (index.ejs)
    });
});

app.post('/schedule-exam', async (req, res) => {
    console.log(req.body); // Log the request body for debugging

    const { subject, questions, date, startTime, endTime } = req.body;

    // Generate a unique quizId
    const quizId = uuidv4();

    const startDateTime = new Date(`${date}T${startTime}:00`);  // Assuming startTime and date are in the local time zone
    const endDateTime = new Date(`${date}T${endTime}:00`);

    // Convert to UTC by calling toISOString() (it will store as UTC in ISO format)
    const startTimeUtc = startDateTime.toISOString();
    const endTimeUtc = endDateTime.toISOString();

    // Create a new Schedule object including the quizId
    const newschedule = new Schedule({
        quizId, // Add the generated quizId
        subject,
        questions,
        date,
        startTime: startTimeUtc,  // Store in UTC
        endTime: endTimeUtc       // Store in UTC
    });

    try {
        await newschedule.save(); // Save the schedule with the generated quizId
        res.redirect('/schedule'); // Redirect on successful save
    } catch (error) {
        res.status(500).send({ message: 'Error saving schedule', error });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});