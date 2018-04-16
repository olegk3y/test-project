import React, { PureComponent } from 'react';
import {
  Linking,
  TouchableWithoutFeedback,
  FlatList,
  View,
  Alert,
} from 'react-native';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import FollowerRow from './FollowerRow';

const Wrapper = styled.View`
  height: 120;
  border-bottom-width: ${({ isBorder }) => (!isBorder ? 1 : 0)};
  display: flex;
  flex-direction: row;
  padding: 10px;
`;

const Avatar = styled.Image`
  height: 100;
  width: 100;
  border-radius: 50;
  border-width: 3;
  border-color: #d3d3d3;
`;

const InfoWrapper = styled.View`
  display: flex;
  flex-direction: column;
  margin-left: 10;
`;

const UserName = styled.Text`
  font-size: 22;
  font-weight: bold;
`;

const Button = styled.View`
  background-color: green;
  border-radius: 20;
  margin-top: 10;
  padding: 5px;
  width: 80;
`;

const ButtonText = styled.Text`
  font-size: 20;
  color: #fff;
  text-align: center;
`;

const StyledArrow = styled.Image`
  position: absolute;
  right: 20;
  top: 40;
`;


class UserRow extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpenFollowers: false,
      followers: null,
    };
  }

  toggleShowFollowers = () => {
    if (!this.state.isOpenFollowers) {
      fetch(this.props.followersLink).then(response => response.json()).then((followers) => {
        this.setState({
          isOpenFollowers: true,
          followers,
        });
      }).catch(err => Alert.alert(err.message));
    } else {
      this.setState({
        isOpenFollowers: false,
        followers: null,
      });
    }
  }

  openLink() {
    Linking.openUrl(this.props.profileLink);
  }

  _keyExtractor = item => `key-${item.login}-${item.id}`;

  render() {
    const { isOpenFollowers, followers } = this.state;
    const {
      name,
      avatar,
    } = this.props;

    return (
      <View>
        <Wrapper isBorder={isOpenFollowers}>
          <Avatar source={{ uri: avatar }} />
          <InfoWrapper>
            <UserName>{name}</UserName>
            <TouchableWithoutFeedback onPress={this.openLink}>
              <Button>
                <ButtonText>OPEN</ButtonText>
              </Button>
            </TouchableWithoutFeedback>
          </InfoWrapper>
          <TouchableWithoutFeedback onPress={this.toggleShowFollowers}>
            {isOpenFollowers ? (
              <StyledArrow source={require('../assets/ic_keyboard_arrow_up.png')} />
            ) : (
              <StyledArrow source={require('../assets/ic_keyboard_arrow_down.png')} />
            )}
          </TouchableWithoutFeedback>
        </Wrapper>
        {followers && <FlatList
          data={followers}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) => (
            <FollowerRow
              name={item.login}
              avatar={item.avatar_url}
            />
          )}
        />}
      </View>
    );
  }
}

UserRow.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  profileLink: PropTypes.string,
  followersLink: PropTypes.string,
};

UserRow.defaultProps = {
  name: '',
  avatar: '',
  profileLink: '',
  followersLink: '',
};

export default UserRow;
