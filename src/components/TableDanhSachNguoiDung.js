import React, { Component } from 'react';
import { connect } from 'react-redux';

class TableDanhSachNguoiDung extends Component {

    xoaTaiKhoan = (taiKhoan) => {
        this.props.dispatch({
            type: 'XOA_TAI_KHOAN',
            taiKhoan
        })
    }

    renderTaiKhoan = () => {
        return this.props.ListTaiKhoan.map((item, index) => {
            
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.taiKhoan}</td>
                    <td>{item.hoTen}</td>
                    <td>{item.matKhau}</td>
                    <td>{item.email}</td>
                    <td>{item.soDienThoai}</td>
                    <td>{item.loaiNguoiDung}</td>
                    <td>
                        <button className="btn btn-primary mr-2" onClick={() => {
                            this.props.dispatch({
                                type: 'SUA_TAI_KHOAN',
                                taiKhoan: item
                            })
                        }}>Chỉnh sửa</button>
                        <button className="btn btn-danger" onClick={() => this.xoaTaiKhoan(item.taiKhoan)}>Xóa</button>
                    </td>
                </tr>
            )
        });
    }

    render() {
        return (
            <div className="card mt-3">
                <div className="card-header bg-light"><h5 className="m-0 p-0">Danh sách người dùng</h5></div>
                <div className="card-body p-0 m-0">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tài khoản</th>
                                <th>Họ tên</th>
                                <th>Mật khẩu</th>
                                <th>Email</th>
                                <th>Số điện thoại</th>
                                <th>Loại người dùng</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTaiKhoan()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    ListTaiKhoan: state.TaiKhoanReducer.taiKhoan
})

export default connect(mapStateToProps)(TableDanhSachNguoiDung);