import { Modal, Input, Space, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { modalOptions } from './GlobalText';
import { CONFIRM_STATE } from '../state/keys';
import { clearStorege, setStorage, getStorage } from '../state/localStorage';
import ButtonItem from './ButtonItem';

// export const ConfirmDelete = (func) => {
//   console.log(`confirm render`);
//   Modal.confirm({
//     title: <p>{modalOptions.confirm.title}</p>,
//     centered: true,
//     content: <p>{modalOptions.confirm.delete}</p>,
//     onOk: () => {
//       new Promise((resolve, reject) => {
//         setStorage(CONFIRM_STATE, true),
//           clearStorage()
//       }).catch(() => console.log('Oops errors!'))
//     },
//     onCancel: () => {
//       setStorage(CONFIRM_STATE, false),
//         clearStorage()
//     }


//   });
// };

function selectOptionType(type) {

  if (type === "confirm") {
    return ({
      title: modalOptions.confirm.title,
      content: modalOptions.confirm.confirm
    })
  } else if (type === "delete") {
    return ({
      title: modalOptions.delete.title,
      content: modalOptions.delete.delete
    })
  } else if (type === "cancel") {
    return ({
      title: modalOptions.cancel.title,
      content: modalOptions.cancel.cancel
    })
  }
}

export const ConfirmModal = (type, func) => {
  console.log(`confirm render`);
  const textOptions = selectOptionType(type);
  console.log("textOptions", textOptions);
  Modal.confirm({
    title: <p>{textOptions.title}</p>,
    centered: true,
    content: <p>{textOptions.content}</p>,
    onOk: () => new Promise((resolve, reject) => {
      func()
      setTimeout(() => {
        resolve(false)
        return false;
      }, 1000);
    }).catch(() => console.log('Oops errors!')),
  });
};

export const ConfirmModalEditText = (func, args) => {
  // console.log(`confirm render`);
  // console.log("textOptions", args);
  Modal.confirm({
    title: <p>{args.title}</p>,
    centered: true,
    content: <p>{args.content}</p>,
    onOk: () => new Promise((resolve, reject) => {     
      func() 
      setTimeout(() => {
        resolve(false)
        return false;
      }, 1000);      
    }).catch((errors) => console.log('Oops errors!', errors)),
  });
};

export const ConfirmModalwithArg = (type, func, args) => {
  console.log(`confirm render`);
  const textOptions = selectOptionType(type);
  console.log("textOptions", textOptions);
  Modal.confirm({
    title: <p>{textOptions.title}</p>,
    centered: true,
    content: <p>{textOptions.content}</p>,
    onOk: () => new Promise((resolve, reject) => {
      func(args)
      setTimeout(() => {
        resolve(false)
        return false;
      }, 1000);
    }).catch(() => console.log('Oops errors!')),
  });

};

export const InfoModal = (infoActive) => {
  console.log(`info render`);
  Modal.info({
    centered: true,
    content: <p>{infoActive}</p>,
  });

};

export const SuccessModal = (successActive = '', onOk = () => { }) => {
  console.log(`success render`);
  Modal.success({
    centered: true,
    content: <p>{successActive}</p>,
    onOk: () => {
      onOk()
    }
  });

};

export const ErrorModal = (errorActive) => {
  console.log(`error render`, errorActive);
  Modal.error({
    title: errorActive.title,
    // width: '90%',
    centered: true,
    content: errorActive.data(),
  });
};

export const ErrorModalMassage = (massage) => {
  Modal.error({
    title: "Error",
    // width: '90%',
    centered: true,
    content: massage,
  });
};

export const ErrorModalMassageHtml = (massage) => {
  Modal.error({
    title: "Warning",
    // width: '90%',
    centered: true,
    content: <div dangerouslySetInnerHTML={{ __html: massage }} />
  });
};

export const ErrorModalList = (data) => {
  console.log(`error render`);
  Modal.error({
    title: data.title,
    centered: true,
    content: <p key={data.Contents[1].key}>{data.Contents[1].value}</p>,
  });

};

export const WarningModal = (warningActive) => {
  console.log(`warning render`);
  Modal.warning({
    centered: true,
    title: "Warning",
    content: <p>{warningActive}</p>,
  });

};
const clearStorage = () => {
  setTimeout(() => {
    clearStorege(CONFIRM_STATE)
    console.log(`clear state success`, getStorage(CONFIRM_STATE));
  }, 5000);
}

export const ModalSubmitForm = (
  {
    fn = async () => { },
    title = null,
    content = null,
    successActive = null,
    redirect = () => { }
  }
) => {
  const textOptions = selectOptionType("confirm");
  Modal.confirm({
    title: <p>{title || textOptions.title}</p>,
    centered: true,
    content: <p>{content || textOptions.content}</p>,
    onOk: async () => {
      return await ProgressTask(fn, successActive, redirect)
    },
  });

}
export const ModalCommonSubmit = (
  {
    fn = async () => { },
    title = null,
    content = null,
  }
) => {
  const textOptions = selectOptionType("confirm");
  Modal.confirm({
    title: <p>{title || textOptions.title}</p>,
    centered: true,
    content: <p>{content || textOptions.content}</p>,
    onOk: async () => {
      return await ManualTask(fn)
    },
  });

}

export const ModalAsyncConfirm = (
  {
    fn = async () => { },
    title = null,
    content = null,
  }
) => {
  const textOptions = selectOptionType("confirm");
  Modal.confirm({
    title: <p>{title || textOptions.title}</p>,
    centered: true,
    content: <p>{content || textOptions.content}</p>,
    onOk: async () => {
      return await fn()
    },
  });

}

export const ModalReasonOrder = (
  {
    fn = async () => { },
    title = '',
    titleConfirm = '',
    serialNo = '',
    textBtn = '',
    successActive = null,
    icon = <></>,
    block = true,
    disabled = false,
    reasonText = '',

  }
) => {
  const [visible, setVisible] = useState(false);
  const [reason, setReason] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    setReason(reasonText)
  }, [reasonText])

  const onCancel = () => {
    setReason('')
    setVisible(false)
  }

  return (
    <>
      <ButtonItem
        label={textBtn}
        type="primary"
        onClick={() => setVisible(true)}
        block={block}
        icon={icon}
      />
      <Modal
        title={<a className="text-dbs">{title}</a>}
        centered
        visible={visible}
        onCancel={onCancel}
        footer={
          disabled ?

            <Row style={{ textAlign: 'center' }}>
              <Col span={24}>
                <ButtonItem
                  label='Close'
                  onClick={() => setVisible(false)}
                />
              </Col>

            </Row>

            :

            <Space>
              <ButtonItem
                label='Cancel'
                onClick={onCancel}
              />
              <ButtonItem
                label='OK'
                onClick={async () => {
                  setVisible(false)
                  if (fn) {
                    ModalSubmitForm({
                      title: titleConfirm,
                      successActive: successActive,
                      fn: async () => dispatch(await fn({ orderId: serialNo, reason: reason }))
                    })
                  }
                }}

              />
            </Space>
        }
      >
        <Input.TextArea rows={4} value={reason} onChange={(e) => setReason(e.target.value)} disabled={disabled} />
      </Modal>
    </>
  );
};
const ProgressTask = async (fn = async () => { }, successActive, redirect) => {
  try {
    await fn()
    console.log('successActive', successActive);
    SuccessModal(successActive ? successActive : 'Success!', redirect)
  } catch (error) {
    console.log('Oops errors! ' + error)
    ErrorModalMassage(error.toString())

  }

}
const ManualTask = async (fn = async () => { }) => {
  try {
    await fn()
  } catch (error) {
    console.log('Oops errors! ' + error)
    ErrorModalMassage(error.toString())
  }

}




