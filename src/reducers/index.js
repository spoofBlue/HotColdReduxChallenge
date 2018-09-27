
import {MAKE_GUESS, RESTART_GAME, GENERATE_AURAL_UPDATE} from '../actions';

const initialState = {
    guesses: [],
    feedback: 'Make your guess!',
    auralStatus: '',
    correctAnswer: Math.floor(Math.random() * 100) + 1,
    title: 'Hot or Cold'
    //title: feedback ? `${feedback} | Hot or Cold` : 'Hot or Cold'
}

export const HotColdReducer = function(state=initialState, action) {
    if (action.type === MAKE_GUESS) {
        const guess = parseInt(action.guess, 10);
        console.log('guess', guess);
        if (isNaN(guess)) {
            return (
                Object.assign({}, state, { feedback : 'Please enter a valid number'})
            );
        }

        const difference = Math.abs(guess - state.correctAnswer);
        let feedback;
        if (difference >= 50) {
        feedback = 'You\'re Ice Cold...';
        } else if (difference >= 30) {
        feedback = 'You\'re Cold...';
        } else if (difference >= 10) {
        feedback = 'You\'re Warm.';
        } else if (difference >= 1) {
        feedback = 'You\'re Hot!';
        } else {
        feedback = 'You got it!';
        }

        return ( Object.assign({}, state, {
            feedback,
            guesses: [...state.guesses, guess]
        }));
      
          // We typically wouldn't touch the DOM directly like this in React
          // but this is the best way to update the title of the page,
          // which is good for giving screen-reader users
          // instant information about the app.
          //document.title = feedback ? `${feedback} | Hot or Cold` : 'Hot or Cold';
    }

    else if (action.type === RESTART_GAME) {
        return Object.assign({}, state, {
            guesses: [],
            feedback: 'Make your guess!',
            auralStatus: '',
            correctAnswer: Math.floor(Math.random() * 100) + 1
          });
    }

    else if (action.type === GENERATE_AURAL_UPDATE) {
        const { guesses, feedback } = state;

        // If there's not exactly 1 guess, we want to
        // pluralize the nouns in this aural update.
        const pluralize = guesses.length !== 1;

        let  auralStatus = `Here's the status of the game right now: ${feedback} You've made ${guesses.length} ${pluralize ? 'guesses' : 'guess'}.`;

        if (guesses.length > 0) {
        auralStatus += ` ${pluralize ? 'In order of most- to least-recent, they are' : 'It was'}: ${guesses.reverse().join(', ')}`;
        }
        return ( 
            Object.assign({}, state, {auralStatus})
        );
    }
    return state;
}