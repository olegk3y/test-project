import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.View`
  height: 65;
  border-bottom-width: 1;
  display: flex;
  flex-direction: row;
  padding: 10px;
  align-items: center;
`;

const Avatar = styled.Image`
  height: 40;
  width: 40;
  border-radius: 20;
`;

const InfoWrapper = styled.View`
  display: flex;
  flex-direction: column;
  margin-left: 10;
`;

const UserName = styled.Text`
  font-size: 16;
  font-weight: bold;
`;

const FollowerRow = ({ avatar, name }) => (
  <Wrapper>
    <Avatar source={{ uri: avatar }} />
    <InfoWrapper>
      <UserName>{name}</UserName>
    </InfoWrapper>
  </Wrapper>
);

FollowerRow.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string,
};

FollowerRow.defaultProps = {
  avatar: '',
  name: '',
};

export default FollowerRow;
