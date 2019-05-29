import React from 'react';
import glamorous from 'glamorous-native';
import { Badge } from 'react-native-paper'

// app theme colors
import { colors } from '../../../config/theme';

// components
import Title from '../Title';
import ContainedImage from '../ContainedImage';
import { COLOR } from '../../../config/styles';

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
  backgroundColor: colors.orange_album,
  justifyContent: 'center'
}));

const BeerPreviewCard = ({ name, imageUrl, artistes }) => {
  return (
    <CardContainer>
      <CardImageContainer>
        
        <Badge
             containerStyle={{ position: 'absolute', bottom: -6, right: -4 }}
             style={{ backgroundColor: COLOR.ARTIST, fontSize: 12 }}
             size={24}
              >
         {artistes}
        </Badge>
        <ContainedImage source={{ uri: imageUrl }} />   
         
      </CardImageContainer>
      <BeerNameContainer>
        <Title align="center" color={colors.white} >
          {name}
        </Title>
      </BeerNameContainer>
    </CardContainer>
  );
};

export default BeerPreviewCard;