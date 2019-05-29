import React from 'react';
import glamorous from 'glamorous-native';

// app theme colors
import { colors } from '../../../config/theme';
import { COLOR } from '../../../config/styles';

// components
import Title from '../Title';
import ContainedImage from '../ContainedImage';

const CardContainer = glamorous.view((props, theme) => ({
  height: 180,
  width: '75%',
  left: '7.5%',
  justifyContent: 'space-around'
}));

const CardImageContainer = glamorous.view((props, theme) => ({
  flex: 1,
  alignItems: 'stretch'
}));

const BeerNameContainer = glamorous.view((props, theme) => ({
  height: '20%',
  backgroundColor: COLOR.ARTIST,
  justifyContent: 'center'
}));

const ArtistPreviewCard = ({ name, imageUrl, colortitle }) => {
  return (
    <CardContainer>
      <CardImageContainer>
        <ContainedImage source={{ uri: imageUrl }} style={{
                            borderRadius: 100
                        }} />
      </CardImageContainer>
      <BeerNameContainer>
        <Title align="center" color={colors.white} >
          {name}
        </Title>
      </BeerNameContainer>
    </CardContainer>
  );
};

export default ArtistPreviewCard;