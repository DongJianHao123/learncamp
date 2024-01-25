import { find, map } from "lodash";
import { useDeviceDetect } from "@/hooks";
import { Modal } from "antd-mobile";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";
import { useStore } from "@/store";
import Icon from "@/components/Icon";
import { CSSProperties, useEffect, useState } from "react";
import { verify_rules } from "@/components/RegisterModal";
import U from "@/common/U";
import { Empty, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Utils } from "@/common/Utils";
import { useMobileContext } from "@/store/context";

const headers = [
  "教室号",
  "课程名称",
  "开始时间",
  "上课地点",
  "备注",
  "课堂回放",
];
interface DataType {
  roomId: string
  className: string
  startAt: string
  location: string
  remark: string
  choseUrl: string
}

const ReplayList = (props: { data: any[], style?: CSSProperties, course: any }) => {
  const [list, setList] = useState<any[]>()
  const router = useRouter();
  const store = useStore();
  const { id: courseId } = router.query;
  let myRegisters = store.myRegisters.value;
  const registerCourse = find(myRegisters, (course) => course.courseId === courseId);

  useEffect(() => {
    if (props.data) {
      const _list = props.data.sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime())
      setList([..._list])
    }
  }, [props.data])

  const columns: ColumnsType<DataType> = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      align: "center",
      width: 80,
      render: (_, row, index) => index + 1
    },
    // {
    //   title: '教室号',
    //   dataIndex: 'roomId',
    //   key: 'roomId',
    //   align: "center",
    // },
    {
      title: '课堂内容',
      dataIndex: 'className',
      key: 'className',
      width: 400
    },
    {
      title: '开始时间',
      dataIndex: 'startAt',
      key: 'startAt',
      align: "center",
      render: (txt) => U.date.format(new Date(txt), "yyyy-MM-dd HH:mm:ss")
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      align: "center",
    },
    {
      title: '课堂回放',
      dataIndex: 'choseUrl',
      key: 'choseUrl',
      align: "center",
      render: (txt, row, index) => <span
        className="player-btn"
        onClick={() => replayClick(row)}
      >
        <Icon symbol="icon-bofang" />
      </span>
    },
  ];

  const openReplay = async (replay: any) => {
    window.open(`/course/${courseId}/replay/${replay.id}`);
  };

  const replayClick = (replay: any) => {
    if (store.user.value?.phone) {

      if (registerCourse) {
        let { verify } = registerCourse;
        if ([verify_rules.ALL_RIGNHT, verify_rules.ONLY_PLAYBACK].includes(verify) || props.course.showqr === 1) {
          openReplay(replay)
        } else {
          Modal.alert({
            content: "报名信息审核通过即可观看",
            closeOnMaskClick: true
          })
        }
      } else {
        Modal.alert({
          content: "请报名后观看",
          closeOnMaskClick: true,
        });
      }
    } else {
      store.login.setLoginFormVisible(true);
    }
  };
  const { isMobile } = useMobileContext()

  const throttleReplayClick = Utils.common.throttle(replayClick, 2000);

  if (isMobile) {
    return (
      <div className="list-mobile" style={props.style}>
        {props.data.length>0?map(props.data, (replay) => (
          <div
            key={replay.id}
            className="list-item"
            onClick={() => throttleReplayClick(replay)}
          >
            <div className="list-item-main-info">
              <div className="info-name">
                {replay.className}
                <span className="location-tag">{replay.location}</span>
              </div>
              <div>
                <span className="list-item-label">教室号:</span> {replay.roomId}
              </div>
              <div>
                <span className="list-item-label">开始时间:</span>{" "}
                {U.date.format(new Date(replay.startAt), "yyyy-MM-dd HH:mm:ss")}
              </div>
              <div>
                <span className="list-item-label">备注:</span> {replay.remark}
              </div>
            </div>
            <div className="list-item-actions">
              <Icon symbol="icon-bofang" />
            </div>
          </div>
        )):<Empty/>
      }
      </div>
    );
  }

  return (
    <div className="list-wrap" style={props.style}>
      <Table className="replays" columns={columns} dataSource={list} pagination={false} />
    </div>
  );
};

export default observer(ReplayList);
