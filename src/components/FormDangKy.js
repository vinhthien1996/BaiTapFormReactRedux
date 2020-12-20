import React, { Component } from 'react';
import { connect } from 'react-redux';

class FormDangKy extends Component {

    handleChangeInput = (event) => {

        let { value, name } = event.target;
        let typeInput = event.target.getAttribute('typeinput');

        const newInfo = { ...this.props.infoTaiKhoan };
        newInfo[name] = value;

        const newErrors = { ...this.props.errorsTaiKhoan };

        newErrors[name] = value.trim() === '' ? name + " không được bỏ trống!" : '';

        if (typeInput === 'email') {
            const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!regexEmail.test(value)) {
                newErrors[name] = name + " không đúng định dạng!";
            }
        }

        if (typeInput === 'phone') {
            const regexPhone = /^[0-9]+$/;
            if (!regexPhone.test(value)) {
                newErrors[name] = name + " không đúng định dạng!";
            }
        }

        this.props.dispatch({
            type: 'HANDLE_TAI_KHOAN',
            errors: newErrors,
            info: newInfo
        })
    }

    handleSubmit = (event) => {
        event.preventDefault(); // Chặn sự kiện submit

        let valid = true;

        for (const key in this.props.infoTaiKhoan) {
            if (this.props.infoTaiKhoan[key].trim() === '') {
                valid = false;
            }
        }

        for (const key in this.props.errorsTaiKhoan) {
            if (this.props.errorsTaiKhoan[key].trim() !== "") {
                valid = false;
            }
        }

        if (!valid) {
            alert("Dữ liệu không hợp lệ!");
            return;
        }

        this.props.dispatch({
            type: 'THEM_TAI_KHOAN'
        });
    }

    handleUpdate = () => {

        let valid = true;

        for (const key in this.props.infoTaiKhoan) {
            if (this.props.infoTaiKhoan[key].trim() === '') {
                valid = false;
            }
        }

        for (const key in this.props.errorsTaiKhoan) {
            if (this.props.errorsTaiKhoan[key].trim() !== "") {
                valid = false;
            }
        }

        if (!valid) {
            alert("Dữ liệu không hợp lệ!");
            return;
        }

        this.props.dispatch({
            type: 'CAP_NHAT_TAI_KHOAN'
        });
    }

    render() {

        return (
            <div className="card mt-4">
                <div className="card-header bg-light"><h5 className="m-0 p-0">Form đăng ký</h5></div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-6">
                                <p className="p-0 m-0 pb-1">Tài khoản</p>
                                <input type="text" className="form-control" name="taiKhoan" value={this.props.infoTaiKhoan.taiKhoan} onChange={this.handleChangeInput} disabled={!this.props.isReg} />
                                <p className="text-danger">{this.props.errorsTaiKhoan.taiKhoan}</p>
                            </div>
                            <div className="col-6">
                                <p className="p-0 m-0 pb-1">Họ tên</p>
                                <input type="text" className="form-control" name="hoTen" value={this.props.infoTaiKhoan.hoTen} onChange={this.handleChangeInput} />
                                <p className="text-danger">{this.props.errorsTaiKhoan.hoTen}</p>
                            </div>
                            <div className="col-6">
                                <p className="p-0 m-0 pt-3 pb-1">Mật khẩu</p>
                                <input type="text" className="form-control" name="matKhau" value={this.props.infoTaiKhoan.matKhau} onChange={this.handleChangeInput} />
                                <p className="text-danger">{this.props.errorsTaiKhoan.matKhau}</p>
                            </div>
                            <div className="col-6">
                                <p className="p-0 m-0 pt-3 pb-1">Số điện thoại</p>
                                <input type="text" className="form-control" name="soDienThoai" typeinput="phone" value={this.props.infoTaiKhoan.soDienThoai} onChange={this.handleChangeInput} />
                                <p className="text-danger">{this.props.errorsTaiKhoan.soDienThoai}</p>
                            </div>
                            <div className="col-6">
                                <p className="p-0 m-0 pt-3 pb-1">Email</p>
                                <input type="text" className="form-control" name="email" typeinput="email" value={this.props.infoTaiKhoan.email} onChange={this.handleChangeInput} />
                                <p className="text-danger">{this.props.errorsTaiKhoan.email}</p>
                            </div>
                            <div className="col-6">
                                <p className="p-0 m-0 pt-3 pb-1">Loại người dùng</p>
                                <select className="form-control" name="loaiNguoiDung" value={this.props.infoTaiKhoan.loaiNguoiDung} onChange={this.handleChangeInput}>
                                    <option>{this.props.infoTaiKhoan.loaiNguoiDung}</option>
                                    <option>Nhân viên</option>
                                    <option>Quản lý</option>
                                </select>
                            </div>
                            <div className="col-12 mt-3">
                                <button className={this.props.isReg ? "btn mr-2 btn-success" : "btn mr-2 btn-light"} disabled={!this.props.isReg}>Đăng ký</button>
                                <button type="button" className={!this.props.isReg ? "btn mr-2 btn-primary" : "btn mr-2 btn-light"} disabled={this.props.isReg} onClick={this.handleUpdate}>Cập nhật</button>
                                {!this.props.isReg ? (
                                    <button className="btn mr-2 btn-danger" onClick={() => {
                                        this.props.dispatch({
                                            type: 'HUY_CAP_NHAT'
                                        })
                                    }}>Hủy</button>
                                ) : ''}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    ListTaiKhoan: state.TaiKhoanReducer.taiKhoan,
    errorsTaiKhoan: state.TaiKhoanReducer.errors,
    infoTaiKhoan: state.TaiKhoanReducer.info,
    isReg: state.TaiKhoanReducer.isReg
})

export default connect(mapStateToProps)(FormDangKy);