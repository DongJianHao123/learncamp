/* eslint-disable @next/next/no-img-element */
import { Button, Empty, Input, Pagination, Popover, Space, Table, Tag, Tooltip, message } from 'antd'
import { EUserType, IMyRegister } from '../../../api/types'
import Icon from '@/components/Icon'
import { CSSProperties, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ColumnsType } from 'antd/lib/table'
import { useMobileContext } from '@/store/context'
import { useStore } from '@/store'
import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons'
import { Modal } from 'antd-mobile'
import { updateStudent } from '@/api'

const iconMap: Record<string, string> = {
  '2': 'status-teacher.png',
  '4': 'status-ta.png',
  '5': 'status-admin.png'
}
interface DataType {
  name: string
  age: string
  gender: string
  tag: string
}

type Role = {
  label: string,
  color?: string,
  value: string
}

const roleList: Role[] = [
  {
    label: '学生',
    color: 'cyan',
    value: EUserType.STUDENT,
  },
  {
    label: '老师',
    color: 'geekblue',
    value: EUserType.TEACHER,
  },
  // {
  //   label: t('common.role.visitor'),
  //   value: EUserType.VISITOR,
  // },
  {
    label: '助教',
    color: 'blue',
    value: EUserType.TUTOR,
  },
  {
    label: '管理员',
    color: 'red',
    value: EUserType.ADMIN,
  },
]

const StudentList = (props: { data: any[], setData: Dispatch<SetStateAction<any[]>>, style?: CSSProperties }) => {
  const { data, setData } = props;
  const [pageSize, setPageSize] = useState<number>(20);
  const [pageNum, setPageNum] = useState<number>(0);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>('')
  const [list, setList] = useState<any[]>([]);
  const { user, myRegisters } = useStore()

  const getRole = (role: string) => {
    return roleList.find((item) => item.value === role)!
  }

  const updateStoreInfo = (row: IMyRegister, obj: any) => {
    let storeIndex = myRegisters.value?.findIndex((item) => item.id === row.id)!;
    let registers = myRegisters.value!
    registers[storeIndex] = { ...registers[storeIndex], ...obj };
    myRegisters.setMyRegisters([...registers])
  }
  const changeRole = (row: IMyRegister, index: number, role: Role) => {
    Modal.confirm({
      content: `您确定要将角色修改为${role.label}吗?`,
      closeOnMaskClick: true,
      confirmText: '确认',
      onConfirm: () => {
        updateStudent({
          id: row.id,
          status: role.value
        }).then((res) => {
          message.success('修改成功 ')
          let realIndex = index + pageSize * pageNum
          data[realIndex].status = role.value
          updateStoreInfo(row, { status: role.value })
          setData([...data])
        }).catch((err) => {
          message.error('修改失败，请重试')
        })
      },
      cancelText: '取消'
    })
  }

  const nameEdit = (row: IMyRegister, index: number) => {
    if (isEdit) {
      if (editName) {
        Modal.confirm({
          content: '您确定要修改报名名称吗？',
          closeOnMaskClick: true,
          confirmText: '确认',
          onConfirm: () => {
            updateStudent({
              id: row.id,
              name: editName
            }).then((res) => {
              message.success('修改成功')
              let realIndex = index + pageSize * pageNum
              data![realIndex].name = editName
              updateStoreInfo(row, { name: editName })
              setData([...data!])
              setIsEdit(false)
            }).catch((err) => {
              message.error('修改失败，请重试')
              setIsEdit(false)
            })
          },
          cancelText: '取消',
          onCancel: () => { setIsEdit(false) }
        })
      } else {
        message.warn('修改内容不能为空')
      }
    } else {
      setEditName(row.name)
      setIsEdit(true)
    }
  }

  const columns: ColumnsType<IMyRegister> = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      align: "center",
      width: 80,
      render: (_, row, index) => index + 1 + pageNum * pageSize
    },
    {
      title: '昵称',
      dataIndex: 'name',
      key: 'name',
      width: 260,
      align: "center",
      render: (name, row, index) => {
        const role = getRole(row.status);
        const content = <ul style={{ margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 15 }}>
          {roleList.filter(item => item.value !== role.value).map(item => <li style={{ cursor: 'pointer' }} onClick={(e) => { changeRole(row, index, item) }} key={item.value}><Tag color={item.color}>{item.label}</Tag></li>)}
        </ul>
        if (user.value && user.value.phone === row.phone) {
          return isEdit ?
            <Space style={{ width: '100%' }}>
              <Input autoFocus bordered={false} style={{ borderBottom: "1px solid #ccc" }} onPressEnter={() => nameEdit(row, index)} value={editName} onChange={(e) => setEditName(e.target.value)} />
              <Tooltip placement="top" title={'确认'}>
                <Button type="link" icon={<CheckOutlined />} onClick={() => nameEdit(row, index)} />
              </Tooltip>
              <Tooltip placement="top" title={'取消'}>
                <Button type="link" danger icon={<CloseOutlined />} onClick={() => setIsEdit(false)} />
              </Tooltip>
            </Space>
            : <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                <span style={{ flex: 1, textAlign: 'right', marginRight: 15 }}>{name} </span>
                <Tooltip placement="top" title={'编辑'}>
                  <Button type="link" shape="circle" onClick={() => nameEdit(row, index)} icon={<EditOutlined />} />
                </Tooltip>
              </div>
              {role && <Popover placement="right" title={'修改角色'} content={content} trigger="click">
                <Tag style={{ cursor: 'pointer' }} color={role.color}>{role.label}</Tag>
              </Popover>}
            </div>
        } else {
          return <div style={{ display: 'flex' }}><span style={{ flex: 1, textAlign: 'center' }}>{name} </span>{role && role.value !== EUserType.STUDENT && <Tag color={role.color}>{role.label}</Tag>}</div>
        }
      }
    },
    {
      title: '年级',
      dataIndex: 'age',
      key: 'age',
      align: "center",
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      align: "center",
    },
    {
      title: '备注',
      dataIndex: 'tag',
      key: 'tag',
      align: "center",
    },
  ];

  useEffect(() => {
    setList(data?.slice(pageNum * pageSize, (pageNum + 1) * pageSize) || [])
  }, [data, pageSize, pageNum])

  const { isMobile } = useMobileContext();

  if (isMobile) {
    return (
      <div style={props.style} className="list-mobile">
        {
          (props.data && props.data.length > 0) ? props.data.map((student, index) => {
            return <div key={student.id} className="list-item">
              <div className="list-item-index">{index + 1}</div>
              <div className="list-item-main-info">
                <div className="info-name">
                  {
                    student.phone === user.value.phone ?
                      isEdit ? <Space style={{ width: '100%' }}>
                        <Input autoFocus bordered={false} style={{ borderBottom: "1px solid #ccc" }} onBlur={() => setIsEdit(false)} onPressEnter={() => nameEdit(student, index)} value={editName} onChange={(e) => setEditName(e.target.value)} />
                        <Button type="link" icon={<CheckOutlined />} onClick={() => nameEdit(student, index)} />
                      </Space>
                        : <span onClick={() => nameEdit(student, index)}>
                          <span>{student.name}</span>
                          <Button type="link" shape="circle" icon={<EditOutlined />} />
                        </span>
                      : student.name}
                  {student.status !== EUserType.STUDENT && (
                    <img
                      height="14"
                      src={`/img/${iconMap[student.status]}`}
                      alt="student-status-png"
                    ></img>
                  )}
                </div>

                <div className="info-other">
                  <span className="current-bg">
                    <span className="list-item-label">职业:</span> {student.age}
                  </span>
                </div>
              </div>

              <div className={`list-item-gender ${student.gender === '女' ? 'woman' : 'man'}`}>
                {student.gender === '女' ? (
                  <Icon symbol="icon-nv" />
                ) : (
                  <Icon symbol="icon-xingbienan" />
                )}
              </div>
              <div className="list-item-tag">{student.tag}</div>
            </div>
          }) : <Empty />
        }
      </div>
    )
  }

  return (
    <div style={props.style} className="list-wrap">
      <Table columns={columns} dataSource={list} pagination={false} />
      <div className='paging-wrap'>
        <Pagination
          showTotal={(e) => "共 " + e + " 人"}
          defaultCurrent={1} total={data?.length}
          onChange={(e) => { setPageNum(e - 1) }}
          onShowSizeChange={(current, pageSize) => { setPageSize(pageSize) }}
          pageSize={pageSize}
          showQuickJumper
        />
      </div>
    </div>
  )
}

export default StudentList
