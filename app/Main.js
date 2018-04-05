import React, { PureComponent } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  ScrollView,
  StyleSheet,
  View
} from "react-native";
import Modal from "react-native-modalbox";
import Icon from "react-native-vector-icons/Foundation";
import BasicInfo from "./BasicInformation/Main";
import DividingLine from "./DividingLine";
import BriefTable from "./BriefIntroductionTable";
import SkillTable from "./SkillChart/main";
import SkillBar from "./SkillPoint/main";
import Github from "./OpenSourceActivity/main";
import Experience from "./Experience/Experience";
import Projects from "./Timeline/TimeLine";
import SharedProjects from "./MyProjects/MyProjects";
import Expansion from "./Expansion/Expansion";
import BottomLine from "./BottomLine";
import Share from "./Modal/Share";
import { Tracker } from "./utils/Analysis";
import { TitleColors } from "./utils/ProjectColors";
import Update from "./utils/update";
import { remToPixel } from "./utils/Convertor";

export default class MainView extends PureComponent {
  constructor() {
    super();
    this.reachEnd = this.reachEnd.bind(this);
    this.modalRef = null;
    this.offset = 0;
    this.scrollView = null;
    this.mySelfOffset = 0;
    this.expertiseOffset = 0;
    this.skillOffset = 0;
    this.githubOffset = 0;
    this.openSourceOffset = 0;
    this.projectsOffset = 0;
    this.experienceOffset = 0;
    this.extraOffset = 0;
  }

  componentWillMount() {
    this.animatedValue = new Animated.ValueXY();
    this.background = new Animated.Value(0);
    this.value = { x: 0, y: 0 };
    this.animatedValue.addListener(value => (this.value = value));
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: () => {
        this.animatedValue.setOffset({ x: this.value.x, y: this.value.y });
        this.background.setValue(150);
      },
      onPanResponderMove: Animated.event([
        null,
        { dx: this.animatedValue.x, dy: this.animatedValue.y }
      ]),
      onPanResponderRelease: () => {
        this.animatedValue.flattenOffset();
        this.background.setValue(0);
      }
    });
  }

  componentDidMount() {
    Tracker.trackScreen();
    Update().catch(error => Tracker.trackError(error.stack));
  }

  reachEnd(handler) {
    const {
      layoutMeasurement,
      contentOffset,
      contentSize
    } = handler.nativeEvent;
    const paddingBottom = 10;
    const isEnd =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingBottom;
    const isDown = contentOffset.y > this.offset;
    this.offset = contentOffset.y;
    if (isDown && isEnd) this.modalRef.open();
  }

  renderPanel() {
    const backgroundColor = this.background.interpolate({
      inputRange: [0, 150],
      outputRange: ["rgba(255,255,255,1)", "rgba(255,255,255,0.8)"]
    });
    return (
      <Animated.View
        style={[
          Styles.panel,
          {
            transform: [
              { translateX: this.animatedValue.x },
              { translateY: this.animatedValue.y }
            ],
            backgroundColor
          }
        ]}
        {...this.panResponder.panHandlers}
      >
        {[
          "torso",
          "like",
          "star",
          "social-github",
          "lightbulb",
          "flag",
          "book",
          "link"
        ].map((name, index) => (
          <View
            style={Styles.panelButton}
            key={`float-${index + 1}`}
            onStartShouldSetResponder={() => true}
            onStartShouldSetResponderCapture={() => true}
            onMoveShouldSetResponder={() => true}
            onResponderGrant={() => {
              let offset = 0;
              switch (index) {
                case 0:
                  offset = this.mySelfOffset;
                  break;
                case 1:
                  offset = this.expertiseOffset;
                  break;
                case 2:
                  offset = this.skillOffset;
                  break;
                case 3:
                  offset = this.githubOffset;
                  break;
                case 4:
                  offset = this.experienceOffset;
                  break;
                case 5:
                  offset = this.projectsOffset;
                  break;
                case 6:
                  offset = this.openSourceOffset;
                  break;
                case 7:
                  offset = this.extraOffset;
                  break;
                default:
                  break;
              }
              this.scrollView.scrollTo({ y: offset });
            }}
          >
            <Icon
              name={name}
              size={remToPixel(1.125)}
              color={TitleColors.VerticalSeparatorColor}
              style={{
                paddingLeft: 2
              }}
            />
          </View>
        ))}
      </Animated.View>
    );
  }

  render() {
    return (
      <View>
        <Modal
          position="center"
          style={Styles.modal}
          ref={ref => (this.modalRef = ref)}
          backdropPressToClose
        >
          <Share close={() => this.modalRef.close()} />
        </Modal>
        <ScrollView
          ref={ref => (this.scrollView = ref)}
          style={Styles.main}
          contentContainerStyle={Styles.contentContainer}
          alwaysBounceVertical
          scrollEventThrottle={400}
          onScroll={this.reachEnd}
          onMomentumScrollStart={() => this.background.setValue(150)}
          onMomentumScrollEnd={() => this.background.setValue(0)}
        >
          <BasicInfo />
          <View
            onLayout={event => (this.mySelfOffset = event.nativeEvent.layout.y)}
          >
            <DividingLine name="torso" title="个人简介" />
          </View>
          <BriefTable />
          <View
            onLayout={event =>
              (this.expertiseOffset = event.nativeEvent.layout.y)
            }
          >
            <DividingLine name="like" title="技能专长" />
          </View>
          <SkillTable />
          <View
            onLayout={event => (this.skillOffset = event.nativeEvent.layout.y)}
          >
            <DividingLine name="star" title="技能评价" />
          </View>
          <SkillBar />
          <View
            onLayout={event => (this.githubOffset = event.nativeEvent.layout.y)}
          >
            <DividingLine name="social-github" title="社区经验" />
          </View>
          <Github />
          <View
            onLayout={event =>
              (this.experienceOffset = event.nativeEvent.layout.y)
            }
          >
            <DividingLine name="lightbulb" title="个人经验" />
          </View>
          <Experience />
          <View
            onLayout={event =>
              (this.projectsOffset = event.nativeEvent.layout.y)
            }
          >
            <DividingLine name="flag" title="项目经历" />
          </View>
          <Projects />
          <View
            onLayout={event =>
              (this.openSourceOffset = event.nativeEvent.layout.y)
            }
          >
            <DividingLine name="book" title="开源项目" />
          </View>
          <SharedProjects />
          <View
            onLayout={event => (this.extraOffset = event.nativeEvent.layout.y)}
          >
            <DividingLine name="link" title="扩展技能" />
          </View>
          <Expansion />
          <BottomLine />
        </ScrollView>
        {this.renderPanel()}
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  contentContainer: {
    marginTop: 48,
    marginHorizontal: 15
  },
  main: {
    backgroundColor: "#FFFFFF"
  },
  modal: {
    justifyContent: "center",
    height: 300,
    width: 300,
    alignItems: "center",
    borderRadius: 3
  },
  panel: {
    position: "absolute",
    right: 8,
    top: (Dimensions.get("window").height - (remToPixel(1.125) + 10) * 8) / 2,
    flexDirection: "column",
    width: remToPixel(1.125),
    borderRadius: remToPixel(1.125) / 2,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: 5,
    opacity: 0.8
  },
  panelButton: {
    width: remToPixel(1.125),
    height: remToPixel(1.125),
    borderRadius: remToPixel(1.125) / 2,
    marginVertical: 5
  }
});
