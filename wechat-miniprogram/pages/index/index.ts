// pages/index/index.ts
Page({
  data: {
    activeTab: 'home',
    user: {
      name: 'Jeremy',
      role: 'owner', // 'owner' or 'provider'
      isVerified: true,
      avatar: 'https://picsum.photos/seed/petowner/100/100',
      rating: 4.9,
      completedOrders: 12
    },
    orders: [
      {
        id: 'o1',
        type: 'feeding',
        petName: 'Mimi',
        petType: 'cat',
        address: '朝阳区 某某小区',
        time: '今天 18:00',
        price: 80,
        status: 'pending'
      },
      {
        id: 'o2',
        type: 'walking',
        petName: 'Buddy',
        petType: 'dog',
        address: '海淀区 某某大厦',
        time: '明天 09:00',
        price: 60,
        status: 'accepted'
      }
    ]
  },

  onLoad() {
    console.log('PetCare Connect Loaded');
  },

  switchTab(e: any) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      activeTab: tab
    });
  },

  toggleRole() {
    const newRole = this.data.user.role === 'owner' ? 'provider' : 'owner';
    this.setData({
      'user.role': newRole
    });
    wx.showToast({
      title: `切换为${newRole === 'owner' ? '主人' : '代护员'}模式`,
      icon: 'none'
    });
  },

  showPostView(e: any) {
    const type = e.currentTarget.dataset.type;
    wx.showModal({
      title: '发布需求',
      content: `您正在发布一个${type === 'feeding' ? '喂猫' : '遛狗'}需求`,
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({ title: '发布中' });
          setTimeout(() => {
            wx.hideLoading();
            wx.showToast({ title: '发布成功' });
          }, 1500);
        }
      }
    });
  },

  showVerifyView() {
    wx.navigateTo({
      url: '/pages/verify/verify'
    });
  }
});
