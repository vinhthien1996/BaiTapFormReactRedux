const stateTaiKhoan = {
    taiKhoan: [
        { taiKhoan: 'nguyenvana', matKhau: '123456', hoTen: 'Nguyễn Văn A', soDienThoai: '0123456789', email: 'nguyenvana@gmail.com', loaiNguoiDung: 'Khách hàng' },
        { taiKhoan: 'nguyenvanb', matKhau: '123456', hoTen: 'Nguyễn Văn B', soDienThoai: '0123546546', email: 'nguyenvanb@gmail.com', loaiNguoiDung: 'Nhân viên' }
    ],
    errors: {
        taiKhoan: '',
        matKhau: '',
        hoTen: '',
        soDienThoai: '',
        email: ''
    },
    info: {
        taiKhoan: '',
        matKhau: '',
        hoTen: '',
        soDienThoai: '',
        email: '',
        loaiNguoiDung: 'Khách hàng'
    },
    isReg: true
}

export const TaiKhoanReducer = (state = stateTaiKhoan, action) => {

    switch (action.type) {
        case 'HANDLE_TAI_KHOAN': {
            state.errors = action.errors;
            state.info = action.info;
            return { ...state };
        }
        case 'THEM_TAI_KHOAN': {
            const taiKhoanCreate = { ...state.info };
            const taiKhoanUpdate = [...state.taiKhoan, taiKhoanCreate];

            return { ...state, taiKhoan: taiKhoanUpdate }
        }
        case 'SUA_TAI_KHOAN': {
            state.info = action.taiKhoan;
            state.errors = {
                taiKhoan: '',
                matKhau: '',
                hoTen: '',
                soDienThoai: '',
                email: ''
            };
            state.isReg = false;
            return { ...state };
        }
        case 'CAP_NHAT_TAI_KHOAN': {
            const taiKhoanUpdate = [...state.taiKhoan];

            let findTaiKhoan = taiKhoanUpdate.find(acc => acc.taiKhoan === state.info.taiKhoan);


            if (findTaiKhoan) {
                findTaiKhoan.matKhau = state.info.matKhau;
                findTaiKhoan.hoTen = state.info.hoTen;
                findTaiKhoan.soDienThoai = state.info.soDienThoai;
                findTaiKhoan.email = state.info.email;
                findTaiKhoan.loaiNguoiDung = state.info.loaiNguoiDung;
            }

            state.taiKhoan = taiKhoanUpdate;
            state.info = {
                taiKhoan: '',
                matKhau: '',
                hoTen: '',
                soDienThoai: '',
                email: '',
                loaiNguoiDung: 'Khách hàng'
            };
            state.isReg = true;

            return { ...state }
        }
        case 'HUY_CAP_NHAT': {
            state.info = {
                taiKhoan: '',
                matKhau: '',
                hoTen: '',
                soDienThoai: '',
                email: '',
                loaiNguoiDung: 'Khách hàng'
            };
            state.errors = {
                taiKhoan: '',
                matKhau: '',
                hoTen: '',
                soDienThoai: '',
                email: ''
            };
            state.isReg = true;
            return { ...state };
        }
        case 'XOA_TAI_KHOAN': {
            const taiKhoanUpdate = [...state.taiKhoan];

            let listTaiKhoanDaXoa = taiKhoanUpdate.filter(acc => acc.taiKhoan !== action.taiKhoan);
            state.taiKhoan = listTaiKhoanDaXoa;
            return { ...state };
        }
        default: {
            return { ...state }
        }
    }
}