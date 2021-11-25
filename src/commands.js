import request from 'request';
import Actions from './actions';

export default class Commands {
  static add(channel, repo, _private) {

    if (_private === '--private') {
      return Actions.add(repo, channel.id)
      .then(result => channel.send(result))
      .catch(error => {
        console.error('ERROR:', error);
        channel.send('Something went wrong. An error has been logged.')
      });
    } else {
      request(`https://github.com/${repo}`, (err, res) => {
        if (res.statusCode === 200) {
          return Actions.add(repo, channel.id)
          .then(result => channel.send(result))
          .catch(error => {
            console.error('ERROR:', error);
            channel.send('Something went wrong. An error has been logged.')
          });
        }
        if (res.statusCode === 404) {
          channel.send('Repository not found.');
        }
      });
    }
  }

  static remove(channel, repo, _private) {
    return Actions.remove(repo, channel.id)
    .then(result => channel.sendMessage(result))
    .catch(error => {
      console.error('ERROR:', error);
      channel.send('Something went wrong. An error has been logged.')
    });
  }

  static help(channel) {
    return Actions.help(channel);
  }
}
