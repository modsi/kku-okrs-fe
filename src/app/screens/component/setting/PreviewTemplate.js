import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { Modal, Card, Row, Col, Button, Typography, Table, Form, Input, Radio, Space, Image, InputNumber, Checkbox, Select, DatePicker, Upload, message } from 'antd';
import { DeleteFilled, UploadOutlined, EditFilled } from "@ant-design/icons";
import { DATE_FULL, DATE_NORMAL } from '../../../utils/Elements'
import moment from 'moment';
import logo from "../../../../assets/images/favicon-96x96.png"
import { STORE_TEMPLATE, StoreTemplateAction } from "../../../redux/actions/StoreSearchAction"
import Draggable from "react-draggable";
import CardDraggable from '../../items/CardDraggable'
import NumberField from "./field/NumberField";
import TitleField from "./field/TitleField";
import TextField from "./field/TextField";
import TextAreaField from "./field/TextAreaField";
import CheckboxField from "./field/CheckboxField";
import SelectField from "./field/SelectField";
import RadioField from "./field/RadioField";
import DayField from "./field/DayField";
import DateTimeField from "./field/DateTimeField";
import RangeDateField from "./field/RangeDateField";
import TableField from "./field/TableField";
import TargetGroupField from "./field/TargetGroupField";
import PDCAField from "./field/PDCAField";

const { Text, Link } = Typography;
const { RangePicker } = DatePicker;
const PreviewTemplate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const [formField] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [showConfigPage, setShowConfigPage] = useState(false);
    const [isModalAddEditVisible, setIsModalAddEditVisible] = useState(false);
    const [listField, setListField] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const storeTemplate = useSelector(state => state?.storeSearchReducer?.[STORE_TEMPLATE])
    const [addEditTitle, setAddEditTitle] = useState("");
    const [fieldContent, setFieldContent] = useState(null);

    const layout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 22 },
        layout: "Inline"
    };

    useEffect(() => {
        setLayoutTemplate()
        handleClickCancel();
    }, [storeTemplate])

    const remove = (id) => {
        console.log('remove ', id);
        let store = [...storeTemplate?.component?.filter((item) => {
            if (item.id !== id) {
                return (
                    true
                )
            }
        })]
        setTemplate({ ...storeTemplate, component: store })
    }

    const editContent = (item) => {
        console.log('editContent ', item);
        setIsModalAddEditVisible(true);
        if (item.type === 'inputNumber') {
            setAddEditTitle("Number Field Component");
            setFieldContent(<NumberField form={formField} content={item} />);
        } else if (item.type === 'title') {
            setAddEditTitle("Title Field Component");
            setFieldContent(<TitleField form={formField} content={item} />);
        } else if (item.type === 'input') {
            setAddEditTitle("Text Field Component");
            setFieldContent(<TextField form={formField} content={item} />);
        } else if (item.type === 'textArea') {
            setAddEditTitle("Text Area Field Component");
            setFieldContent(<TextAreaField form={formField} content={item} />);
        } else if (item.type === 'checkbox') {
            setAddEditTitle("Checkbox Field Component");
            setFieldContent(<CheckboxField form={formField} content={item} />);
        } else if (item.type === 'select') {
            setAddEditTitle("Select Field Component");
            setFieldContent(<SelectField form={formField} content={item} />);
        } else if (item.type === 'radio') {
            setAddEditTitle("Radio Field Component");
            setFieldContent(<RadioField form={formField} content={item} />);
        } else if (item.type === 'day') {
            setAddEditTitle("Day Field Component");
            setFieldContent(<DayField form={formField} content={item} />);
        } else if (item.type === 'date_time') {
            setAddEditTitle("Date/Time Field Component");
            setFieldContent(<DateTimeField form={formField} content={item} />);
        } else if (item.type === 'range_date') {
            setAddEditTitle("Range Date Field Component");
            setFieldContent(<RangeDateField form={formField} content={item} />);
        } else if (item.type === 'table') {
            setAddEditTitle("Table Component");
            setFieldContent(<TableField form={formField} content={item} />);
        }
    }

    async function setTemplate(data) {
        dispatch(await StoreTemplateAction(data))
    }

    const propsUpload = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const eventHandler = (e, data) => {
        console.log('Event Type', e.type);
        // console.log({ e, data });
        // console.log(data?.node.id);
        // console.log(data?.y);
        if (data?.y !== 0) {
            let c = Math.round(data?.y / 100)
            // console.log(c);
            let tmp = [...storeTemplate?.component]
            // console.log(tmp);
            let tmpO = tmp?.find(item => item.id === data?.node.id);
            let newIndex = tmpO.index + c
            newIndex = (newIndex <= 0 ? 1 : (newIndex > tmp.length ? tmp.length : newIndex))
            // console.log(newIndex);
            let components = []
            // console.log('eventHandler ', tmpO.id);
            if (tmp) {
                tmp.sort((a, b) => (a.index > b.index) ? 1 : -1)
                let inx = 1;
                tmpO.index = newIndex;
                components.push(tmpO);
                tmp?.map((i) => {
                    if (newIndex === inx) {
                        inx = inx + 1;
                    }
                    if (i.id !== tmpO.id) {
                        i.index = inx;
                        components.push(i);
                        inx = inx + 1;
                    }
                })
            }
            setTemplate({ ...storeTemplate, component: components })
        }
    }

    const setLayoutTemplate = () => {
        console.log('start preview setLayoutTemplate')
        let listField = []
        let components = []
        if (storeTemplate?.component) {
            components = [...storeTemplate?.component]
            components.sort((a, b) => (a.index > b.index) ? 1 : -1)
        }
        components?.map((currentItem) => {
            let size = (!currentItem.size || currentItem.size === 'long' ? 24 : 12)
            const formItemLayout =
                currentItem.isSubTitle ? {
                    labelCol: {
                        span: 20,
                    },
                    wrapperCol: {
                        span: 20,
                    },
                    style: { paddingLeft: '50px' }
                }
                    : {
                        labelCol: {
                            span: 24,
                        },
                        wrapperCol: {
                            span: 24,
                        }
                    };
            let field = (
                <>
                    <Col xs={24} sm={24} md={size} lg={size} xl={size} style={{ textAlign: currentItem.align ?? "left" }}>
                        <Draggable
                            axis='y'
                            position={{ x: 0, y: 0 }}
                            onStop={eventHandler}
                        >
                            <Card id={currentItem.id} >
                                <Card.Grid style={{ width: '100%' }}>
                                    {currentItem.key === 'OKRs_TargetGroup' ?
                                        <>
                                            <Row>
                                                <Col xs={24} sm={24} md={2} lg={2} xl={2} >
                                                    {storeTemplate?.templateId ? null :
                                                        <>
                                                            <Button
                                                                type="link"
                                                                style={{ padding: '0px', color: 'red' }}
                                                                onClick={() =>
                                                                    remove(currentItem.id)
                                                                }
                                                            >
                                                                <DeleteFilled />
                                                            </Button>
                                                        </>
                                                    }
                                                </Col>
                                                <Col xs={24} sm={24} md={22} lg={22} xl={22} >
                                                    <TargetGroupField form={formField} content={currentItem} />
                                                </Col>
                                            </Row>
                                        </>
                                        :
                                        currentItem.key === 'OKRs_PDCA' ?
                                            <>
                                                <Row>
                                                    <Col xs={24} sm={24} md={2} lg={2} xl={2} >
                                                        {storeTemplate?.templateId ? null :
                                                            <>
                                                                <Button
                                                                    type="link"
                                                                    style={{ padding: '0px', color: 'red' }}
                                                                    onClick={() =>
                                                                        remove(currentItem.id)
                                                                    }
                                                                >
                                                                    <DeleteFilled />
                                                                </Button>
                                                            </>
                                                        }
                                                    </Col>
                                                    <Col xs={24} sm={24} md={22} lg={22} xl={22} >
                                                        <PDCAField form={formField} content={currentItem} />
                                                    </Col>
                                                </Row>
                                            </>
                                            :
                                            <Row>
                                                <Col xs={24} sm={24} md={2} lg={2} xl={2} >
                                                    {storeTemplate?.templateId ? null :
                                                        <>
                                                            <Button
                                                                type="link"
                                                                disabled={currentItem.required ? true : false}
                                                                style={{ padding: '0px', color: currentItem.required ? 'gray' : 'red' }}
                                                                onClick={() =>
                                                                    remove(currentItem.id)
                                                                }
                                                            >
                                                                <DeleteFilled />
                                                            </Button>
                                                            <br />
                                                            <Button
                                                                type="link"
                                                                style={{ padding: '0px', color: 'red' }}
                                                                onClick={() =>
                                                                    editContent(currentItem)
                                                                }
                                                            >
                                                                <EditFilled />
                                                            </Button>
                                                        </>
                                                    }
                                                </Col>
                                                <Col xs={24} sm={24} md={22} lg={22} xl={22} >
                                                    {currentItem.type === 'table' ?
                                                        <>
                                                            <Text>{currentItem.label}</Text>
                                                            {setTableContent(currentItem.columns, currentItem.rows)}
                                                        </>
                                                        : currentItem.type === 'title' ?
                                                            (<Text style={currentItem.isSubTitle ? { paddingLeft: '50px' } : {}}>{currentItem?.label}</Text>)
                                                            : (<Form.Item
                                                                className="template-text"
                                                                labelAlign='left'
                                                                labelWrap='true'
                                                                {...formItemLayout}
                                                                layout={currentItem.labelPosition ?? 'vertical'}
                                                                label={currentItem.label}
                                                                name={currentItem.key}
                                                            // rules={[{ required: currentItem.required ? true : false, message: 'Please input ' + currentItem?.label }]}
                                                            >
                                                                {currentItem.type === 'textArea' ?
                                                                    (<Input.TextArea showCount maxLength={currentItem.maxLength} />)
                                                                    : currentItem.type === 'inputNumber' ?
                                                                        (<InputNumber min={currentItem.min} max={currentItem.max} />)
                                                                        : currentItem.type === 'checkbox' ?
                                                                            (<Checkbox.Group options={currentItem.options} />)
                                                                            : currentItem.type === 'select' ?
                                                                                (<Select
                                                                                    mode={currentItem.mode}
                                                                                    placeholder="Please select"
                                                                                    style={{ width: '100%' }}
                                                                                    options={currentItem.options}
                                                                                />)
                                                                                : currentItem.type === 'radio' ?
                                                                                    (<Radio.Group
                                                                                        options={currentItem.options}
                                                                                    />)
                                                                                    : currentItem.type === 'day' ?
                                                                                        (<DatePicker />)
                                                                                        : currentItem.type === 'date_time' ?
                                                                                            (<DatePicker showTime format="DD/MM/YYYY HH:mm:ss" />)
                                                                                            : currentItem.type === 'range_date' ?
                                                                                                (<RangePicker />)
                                                                                                : currentItem.type === 'upload' ?
                                                                                                    (<Upload {...propsUpload}>
                                                                                                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                                                                                    </Upload>)
                                                                                                    // : currentItem.type === 'email' ?
                                                                                                    // (<Input placeholder="Please enter email." onChange={(e) => form.validateFields()} />)                                                                                        
                                                                                                    : (<Input />)
                                                                }
                                                            </Form.Item>
                                                            )}
                                                </Col>
                                            </Row>

                                    }
                                </Card.Grid>
                            </Card>
                        </Draggable>
                    </Col>
                </>
            )
            listField.push(field)
        })
        setListField(listField)
    }

    const setTableContent = (options, row) => {
        let dataSource = []
        let columns = []
        options?.sort((a, b) => (a.index > b.index) ? 1 : -1)
        options.map((item, index) => {
            let col = {
                title: item.colLabel ?? 'column label',
                dataIndex: item.colKey ?? ("colKey" + item.index),
                key: item.colKey ?? ("colKey" + item.index),
            }
            columns.push(col);
        })

        for (let i = 0; i < row; i++) {
            let d = {}
            d.key = i
            d.index = i + 1
            columns.map((c) => {
                Object.assign(d, { [c.dataIndex]: null })
            });
            dataSource.push(d)
        }

        const EditableCell = ({
            dataIndex,
            index,
            record,
            ...restProps
        }) => {
            // console.log(dataIndex,record,index)
            return (
                <td {...restProps} style={{ padding: '2px' }}>
                    <Form.Item
                        name={dataIndex + '_' + record?.index}
                        style={{ margin: 0, padding: 0 }}
                    >
                        <Input
                            style={{ width: '100%', textAlign: "left" }}
                            size="small"
                        />

                    </Form.Item>

                </td>
            );
        };


        const mergedColumns = columns.map(col => {
            return {
                ...col,
                onCell: (record, index) => ({
                    record,
                    index,
                    dataIndex: col.dataIndex,
                }),
            };
        });

        return (
            <>
                <Table
                    dataSource={dataSource}
                    columns={mergedColumns}
                    pagination={false}
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                />
            </>
        )
    }

    const handleClickCancel = () => {
        formField.resetFields();
        setIsModalAddEditVisible(false);
    };

    return (
        <>
            <Card title={""} className="rounded" >
                <Row gutter={24}>
                    <Col span={24} style={{ textAlign: "center" }}>
                        <Form
                            {...layout}
                            form={form}
                        >
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Image
                                        src={logo}
                                        preview={false}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Text strong>--- Report Name ---</Text>
                                </Col>
                            </Row>
                            <Row>
                                {listField}
                            </Row>
                        </Form>
                    </Col>
                </Row>

            </Card>

            <div>
                <Modal
                    closable={true}
                    title={addEditTitle}
                    visible={isModalAddEditVisible}
                    width={"70%"}
                    centered={true}
                    footer={null}
                    onCancel={handleClickCancel}
                >
                    <>{fieldContent}</>
                </Modal>
            </div>
        </>
    )
}
export default PreviewTemplate;