import React, { PureComponent } from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import { Cell, Row, Table, TableWrapper } from "react-native-table-component";
import { TitleColors } from "../utils/ProjectColors";
import { remToPixel } from "../utils/Convertor";
import { Tracker } from "../utils/Analysis";

export default class CommunityTable extends PureComponent {
  constructor() {
    super();
    this.state = {
      tableHead: ["领域", "日常社区活动"],
      tableData: [
        ["开源项目", "开发、维护和推广"],
        ["技术文章", "经常撰写个人在知乎上"]
      ]
    };
  }

  render() {
    const { tableHead, tableData } = this.state;
    const element = (data, index) =>
      index === 0 ? (
        <View>
          <Text style={Styles.text}>
            {data}
            <Text
              style={Styles.hyperLink}
              onPress={() => {
                Tracker.send("查看我的Github");
                Linking.openURL("https://github.com/AmatsuZero").catch(err =>
                  Tracker.trackError(err.stack)
                );
              }}
            >
              个人
            </Text>
            <Text>和</Text>
            <Text
              style={Styles.hyperLink}
              onPress={() => {
                Tracker.send("查看墨刀开源项目");
                Linking.openURL("https://github.com/mockingbot").catch(err =>
                  Tracker.trackError(err.stack)
                );
              }}
            >
              墨刀
            </Text>
            <Text>的开源项目</Text>
          </Text>
        </View>
      ) : (
        <View>
          <Text style={Styles.text}>
            {data}
            <Text
              style={Styles.hyperLink}
              onPress={() => {
                Tracker.send("查看我的知乎页面");
                Linking.openURL(
                  "https://www.zhihu.com/people/jiang-zhen-hua-86/activities"
                ).catch(err => Tracker.trackError(err.stack));
              }}
            >
              发布技术文章
            </Text>
          </Text>
        </View>
      );
    return (
      <View style={Styles.container}>
        <Table borderStyle={{ borderColor: TitleColors.H3TitleColor }}>
          <Row data={tableHead} style={Styles.head} textStyle={Styles.title} />
          {tableData.map((rowData, index) => (
            <TableWrapper key={`tableData-${index + 1}`} style={Styles.row}>
              {rowData.map((cellData, cellIndex) => (
                <Cell
                  key={`RowData-${cellIndex + 1}`}
                  data={cellIndex === 1 ? element(cellData, index) : cellData}
                  textStyle={Styles.text}
                  style={{
                    flex: cellIndex === 1 ? 4 : 1
                  }}
                />
              ))}
            </TableWrapper>
          ))}
        </Table>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  head: {
    height: 40,
    backgroundColor: TitleColors.H3TitleColor
  },
  title: {
    fontSize: remToPixel(0.875),
    fontWeight: "bold",
    lineHeight: remToPixel(1.125),
    textAlign: "left"
  },
  row: {
    flexDirection: "row",
    backgroundColor: "white",
    height: 40
  },
  hyperLink: {
    color: TitleColors.HyperLink
  },
  text: {
    color: TitleColors.H1TitleColor,
    lineHeight: remToPixel(1.124),
    textAlign: "left",
    fontSize: remToPixel(0.875)
  }
});
