import React from 'react';

import Header from './header';
import GuessSection from './guess-section';
import StatusSection from './status-section';
import InfoSection from './info-section';

import {connect} from 'react-redux';
import {makeGuess, restartGame, generateAuralUpdate} from '../actions';

export class Game extends React.Component {
  makeGuess(guess) {
    this.props.dispatch(makeGuess(guess));
  }

  restartGame() {
    this.props.dispatch(restartGame());
  }

  generateAuralUpdate() {
    this.props.dispatch(generateAuralUpdate());
  }

  render() {
    const { feedback, guesses, auralStatus } = this.props;
    const guessCount = guesses.length;

    return (
      <div>
        <Header
          onRestartGame={() => this.restartGame()}
          onGenerateAuralUpdate={() => this.generateAuralUpdate()}
        />
        <main role="main">
          <GuessSection
            feedback={feedback}
            guessCount={guessCount}
            onMakeGuess={guess => this.makeGuess(guess)}
          />
          <StatusSection guesses={guesses} 
            auralStatus={auralStatus}
          />
          <InfoSection />
        </main>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  guesses: state.guesses,
  feedback: state.feedback,
  auralStatus: state.auralStatus,
  correctAnswer: state.correctAnswer
});

export default connect(mapStateToProps)(Game);
