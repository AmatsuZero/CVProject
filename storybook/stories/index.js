import React from "react";
import { storiesOf } from "@storybook/react-native";
import { linkTo } from "@storybook/addon-links";

import Welcome from "./Welcome";
import AboutMe from "./AboutMe";
import Introduction from "./BriefIntroduction";
import PieChart from "./PieChart";
import SkillBar from "./SkillBar";
import Projects from "./Projects";

storiesOf("Welcome", module).add("介绍", () => (
  <Welcome showApp={linkTo("Button")} />
));

storiesOf("关于我", module)
  .add("基本信息", () => <AboutMe />)
  .add("个人简介", () => <Introduction />)
  .add("技能专长", () => <PieChart />)
  .add("技能评价", () => <SkillBar />)
  .add("开源项目", () => <Projects />);
