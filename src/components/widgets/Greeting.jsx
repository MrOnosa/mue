import React from 'react';

export default class Greeting extends React.PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      greeting: ''
    };
  }

  doEvents(time, message) {
    if (localStorage.getItem('events') === 'false') return message;

    // Get current month & day
    const m = time.getMonth();
    const d = time.getDate();

    if (m === 11 && d === 25) message = this.props.language.christmas; // If it's December 25th, set the greeting string to "Merry Christmas"
    else if (m === 0 && d === 1) message = this.props.language.newyear; // If the date is January 1st, set the greeting string to "Happy new year"
    else if (m === 9 && d === 31) message = this.props.language.halloween; // If it's October 31st, set the greeting string to "Happy Halloween"

    return message;
  }

  getGreeting() {
    const now = new Date();
    const hour = now.getHours();

    let message = this.props.language.evening; // Set the default greeting string to "Good evening"
    if (hour < 12) message = this.props.language.morning; // If it's before 12am, set the greeting string to "Good morning"
    else if (hour < 18) message = this.props.language.afternoon; // If it's before 6pm, set the greeting string to "Good afternoon"

    // Events
    message = this.doEvents(now, message);
    const custom = localStorage.getItem('defaultGreetingMessage');
    if (custom === 'false') message = '';

    // Name
    let name = '';
    const data = localStorage.getItem('greetingName');

    if (typeof data === 'string') {
      if (data.replace(/\s/g, '').length > 0) name = `, ${data.trim()}`;
    }

    if (custom === 'false') name = name.replace(',', '');

    // Set the state to the greeting string
    this.setState({
      greeting: `${message}${name}`
    });
  }

  componentDidMount() {
    if (localStorage.getItem('greeting') === 'false') return;
    this.getGreeting();
  }

  render() {
    return <h1 className='greeting'>
      {this.state.greeting}
    </h1>;
  }
}
