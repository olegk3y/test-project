import React, { PureComponent } from 'react';
import { View, Alert, FlatList, Platform } from 'react-native';
import styled from 'styled-components';

import UserRow from './components/UserRow';

const USERS_PER_REQUEST = 10;
const API_USERS_URL = `https://api.github.com/users?per_page=${USERS_PER_REQUEST}`;

const StatusBarBackground = styled.View`
  height: ${Platform.OS === 'ios' ? 20 : 0};
  background-color: #fff;
`;

class UsersList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
      since: 0,
    };
  }

  componentDidMount() {
    this.fetchUsers(API_USERS_URL).then((users) => {
      this.setState({
        users,
        since: users[users.length - 1].id,
      });
    }).catch(err => Alert.alert(err.message));
  }

  fetchUsersSince = (url) => {
    this.fetchUsers(url).then((users) => {
      this.setState({
        users: [
          ...this.state.users,
          ...users,
        ],
        since: users[users.length - 1].id,
      });
    }).catch(err => Alert.alert(err.message));
  }

  fetchUsers = url => fetch(url).then(response => response.json());

  _keyExtractor = item => `key-${item.login}-${item.id}`;

  render() {
    const { users, since } = this.state;

    return (
      <View>
        <StatusBarBackground />
        {users &&
          <FlatList
            data={users}
            keyExtractor={this._keyExtractor}
            onEndReached={() => { this.fetchUsersSince(`${API_USERS_URL}&since=${since}`); }}
            onEndReachedThreshold={0.5}
            renderItem={({ item }) => (
              <UserRow
                name={item.login}
                avatar={item.avatar_url}
                profileLink={item.url}
                followersLink={item.followers_url}
              />
            )}
          />
        }
      </View>
    );
  }
}

export default UsersList;
