const connection = require('../config/database');

module.exports = {
    create: (data, callback) => {
        const query = 
				`INSERT INTO user (firstName, lastName, email, password, mobileNo)
         VALUES (?, ?, ?, ?, ?)`;
        const values = [
					data.firstName, 
					data.lastName, 
					data.email, 
					data.password, 
					data.mobileNo
				];
        
        connection.query(query, values, (error, results) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        });
    },

		getUser: (data, callback) => {
			const query = 
			`select user_id,firstName, lastName, email, password, mobileNo from user`
			const values = [];

			connection.query(query, values, (error, results) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      });
		},

		getUserById: (user_id, callback) => {
			const query = 
      `select user_id,firstName, lastName, email, password, mobileNo from user where user_id =?`
      const values = [user_id];
			connection.query(query, values, (error, results) => {
				if (error) {
          return callback(error);
        }
        return callback(null, results);
      });
		},

		updateUser: (user_id, data, callback) => {
			const query = 
      `update user 
			 set firstName =?, lastName =?, email =?, password =?, mobileNo =? 
			 where user_id =?`
      const values = [
          data.firstName, 
          data.lastName, 
          data.email, 
          data.password, 
          data.mobileNo,
          user_id
        ];
      connection.query(query, values, (error, results) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      });
		}, 
		
		deleteUser: (user_id, callback) => {
			const query = 
      `delete from user where user_id =?`
      const values = [
				user_id
			];
      connection.query(query, values, (error, results) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      });
		},

		loginUser: (email, password, callback) => {
			const query = 
      `select * from user where email =? and password =?`
      const values = [
				email, password
			];
      connection.query(query, values, (error, results) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      });
		},
};

