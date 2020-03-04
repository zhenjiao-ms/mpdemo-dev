const {cloud } = require("miniapp-sdk");

module.exports = async function (context, req) {
    const db = wx.cloud.database()
    db.collection('counters').add({
      data: {
        count: 1
      },
      success: res => {
        console.log('record added succeeded', res._id);
      },
      fail: err => {
        console.error('record added failed', err);
      }
    })
};