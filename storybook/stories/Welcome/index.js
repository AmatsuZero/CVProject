import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

export default class Welcome extends React.Component {
  styles = {
    wrapper: {
      flex: 1,
      padding: 24,
      justifyContent: 'center',
    },
    header: {
      fontSize: 18,
      marginBottom: 18,
    },
    content: {
      fontSize: 12,
      marginBottom: 10,
      lineHeight: 18,
    },
    code:{
      fontStyle:'italic',
      backgroundColor:'black',
      color:'white'
    }
  };

  showApp(event) {
    event.preventDefault();
    if (this.props.showApp) this.props.showApp();
  }

  render() {
    return (
      <View style={this.styles.wrapper}>
        <Text style={this.styles.header}>欢迎使用Storybook查看本人简历</Text>
        <Text style={this.styles.content}>
          这只是一份基础简历，如果想看完整版，请关闭storybook进程，重新执行:
        </Text>
        <Text style={this.styles.code}>
            {'react-native start \n'}
            {'react-native run-<\platform\>'}
        </Text>
      </View>
    );
  }
}

Welcome.defaultProps = {
  showApp: null,
};

Welcome.propTypes = {
  showApp: PropTypes.func,
};
