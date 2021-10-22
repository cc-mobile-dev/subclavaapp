import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather';

import styles from './UploadImage.style';
import { toast } from '../../../../utilities/toast';

const Parse = require('parse/react-native');

const UploadImage = props => {
  const {
    imageUrl,
    name,
    onSelect,
    onLoading,
    defaultIcon = 'user-plus',
    color = '#421290',
    size,
    iconSize = 22,
    imageStyle,
  } = props;

  const [uri, setUri] = useState(imageUrl);

  useEffect(() => {
    if (!imageUrl) {
      onSelect(null)
      setUri(null)
    }
  }, [imageUrl])

  const _handlePickImage = async () => {
    try {
      let result = await new Promise(resolve => {
        launchImageLibrary(
          {
            mediaType: 'photo',
            quality: 0.1,
            includeBase64: true
          },
          (response) => {
            if (response.assets) {
              let result = response.assets.length > 0 ? response.assets[0] : { base64: '', type: '', name: '' }
              resolve({
                cancelled: response.errorCode || response.didCancel,
                base64: result.base64,
                type: result.type,
                name: result.fileName,
              });
            } else {
              resolve({
                cancelled: response.errorCode || response.didCancel
              });
            }
          },
        );
      });

      if (result.cancelled) {
        onLoading(false);
        return;
      }

      if (result.base64) {
        onLoading(true);
        let file = new Parse.File(
          name || result.name,
          { base64: result.base64 },
          result.type,
        );
        try {
          await file.save();
          setUri(file.url(true));
          onSelect(file.toJSON());
        } catch (e) {
          toast('Failed to upload image', 2000);
          console.log(e);
        }
      } else {
        toast('Failed to upload image', 2000);
      }

      onLoading(false);
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <View
      style={{
        ...styles.imageView(size),
        ...imageStyle,
      }}>
      <TouchableOpacity style={{ marginTop: -20 }} onPress={_handlePickImage}>
        {uri ? (
          <Image source={{ uri }} style={{
            ...styles.avatarImage(size),
            ...imageStyle
          }} />
        ) : (
            <View style={{
              ...styles.avatarIconBkg(size),
              ...imageStyle
            }}>
              <Feather
                name={defaultIcon}
                style={styles.avatarIcon}
                size={iconSize}
                color={color}
              />
            </View>
          )}
      </TouchableOpacity>
      {/* {editMode && (
        <View style={styles.avatarEditButton}>
          <Feather name={'edit-2'} style={styles.avatarEditIcon} />
        </View>
      )} */}
    </View>
  );
};

export default UploadImage;
