module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "member",
    {
      member_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: "회원고유번호",
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "사용자메일주소",
      },
      member_password: {
        type: DataTypes.STRING(200),
        allowNull: false,
        comment: "사용자 난독화된 해시암호문자열",
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "회원명",
      },
      use_role_code: {
        type: DataTypes.TINYINT,
        allowNull: false,
        comment: "사용자권한코드 0:관리자 1:슈퍼사용자, 2:일반사용자",
      },
      use_state_code: {
        type: DataTypes.TINYINT,
        allowNull: false,
        comment: "이용상태 0:허용대기 1:사용중 2:탈퇴처리",
      },
      entry_date: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "등록일시",
      },
    },
    {
      sequelize,
      tableName: "member",
      timestamps: false,
      comment: "회원정보",
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "member_id" }],
        },
      ],
    }
  );
};
