from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
import sqlite3
import os
import random
import webbrowser


app = Flask(__name__, static_folder="build/static", template_folder="build")
CORS(app)
 

# Global Constants :
WORKING_DIR = os.getcwd()


# Create Table (USERS) :
def CREATE_TABLE_USERS(db_path) :
    try :
        conn = sqlite3.connect(db_path)
        cur = conn.cursor()
        sql_query = '''CREATE TABLE IF NOT EXISTS USERS(
            USER_NAME VARCHAR(100),
            USER_PASSWORD VARCHAR(100)
            )'''
        cur.execute(sql_query)
        conn.commit()
        conn.close()
    except Exception as e :
        print("CREATE_TABLE_USERS Exception : ",e)

db_path_users = os.path.join(WORKING_DIR,"Dependency",'Users.db')
CREATE_TABLE_USERS(db_path_users)


# Create Table (EXPENSE) :
def CREATE_TABLE_EXPENSE(db_path) :
    try :
        conn = sqlite3.connect(db_path)
        cur = conn.cursor()
        sql_query = '''CREATE TABLE IF NOT EXISTS EXPENSE(
            USERNAME VARCHAR(100),
            PASSWORD VARCHAR(100),
            TYPE VARCHAR(100),
            NAME VARCHAR(100),
            DATE VARCHAR(100),
            AMOUNT VARCHAR(100)
            )'''
        cur.execute(sql_query)
        conn.commit()
        conn.close()
    except Exception as e :
        print("CREATE_TABLE_EXPENSE Exception : ",e)

db_path_expense_list = os.path.join(WORKING_DIR,"Dependency",'Expense.db')
CREATE_TABLE_EXPENSE(db_path_expense_list)


# INSERT Table (EXPENSE) :
def INSERT_TABLE_EXPENSE(db_path) :
    try :
        conn = sqlite3.connect(db_path)
        cur = conn.cursor()

        val = random.random()

        # sql_query = "INSERT INTO EXPENSE VALUES('{}', '{}','{}', '{}')".format("Deposit","125X Scheme","24-09-2022","5000")
        sql_query = "INSERT INTO EXPENSE VALUES('{}', '{}','{}', '{}')".format(val,val,val,val)

        cur.execute(sql_query)
        conn.commit()
        conn.close()
    except Exception as e :
        print("CREATE_TABLE_EXPENSE Exception : ",e)

db_path_expense_list = os.path.join(WORKING_DIR,"Dependency",'Expense.db')
# INSERT_TABLE_EXPENSE(db_path_expense_list)
################################################



@app.route("/")
def hello():
    return render_template('index.html')


@app.route('/validation', methods=['GET'])
def validation():
    args_rec = request.args
    username = args_rec.get("username", default="", type=str)
    password = args_rec.get("password", default="", type=str)

    # print(username,password)

    db_path_users = os.path.join(WORKING_DIR,"Dependency",'Users.db')
    try :
        conn = sqlite3.connect(db_path_users)
        cur = conn.cursor()   

        sql_query = "SELECT USER_NAME FROM USERS WHERE USER_NAME='{}'".format(username)
        sql_data = cur.execute(sql_query)
        sql_data = list(sql_data)

        if(len(sql_data)==0) :
            sql_query = "INSERT INTO USERS VALUES('{}', '{}')".format(username,password)
            cur.execute(sql_query)
            res_code = "1001"
        else :
            res_code = "1000"
        conn.commit()
        conn.close()
    except Exception as e :
        print("validation function  Exception : ",e)
        res_code = "1000"
    finally :
        return res_code



@app.route('/login', methods=['GET'])
def login():
    args_rec = request.args
    username = args_rec.get("username", default="", type=str)
    password = args_rec.get("password", default="", type=str)

    db_path_users = os.path.join(WORKING_DIR,"Dependency",'Users.db')
    try :
        conn = sqlite3.connect(db_path_users)
        cur = conn.cursor()   

        sql_query = "SELECT * FROM USERS WHERE USER_NAME='{}' AND USER_PASSWORD='{}'".format(username,password)
        sql_data = cur.execute(sql_query)
        sql_data = list(sql_data)

        if(len(sql_data)==0) :
            res_code = "1000"
        else :
            res_code = "1001"
        conn.commit()
        conn.close()
    except Exception as e :
        print("login function  Exception : ",e)
        res_code = "1000"
    finally :
        return res_code




@app.route('/get_expense_list', methods=['POST'])
def get_expense_list():

    db_path_expense_list = os.path.join(WORKING_DIR,"Dependency",'Expense.db')

    try :
        post_json = request.json
    except :
        post_json = {}

    try :
        sql_data = []

        conn = sqlite3.connect(db_path_expense_list)
        cur = conn.cursor()   
        # sql_query = "SELECT * FROM EXPENSE WHERE USERNAME ='{}' AND PASSWORD ='{}'".format(post_json['USERNAME'], post_json['PASSWORD'])
        sql_query = "SELECT TYPE,NAME,DATE,AMOUNT FROM EXPENSE WHERE USERNAME ='{}' AND PASSWORD ='{}'".format(post_json['USERNAME'], post_json['PASSWORD'])
        sql_data = cur.execute(sql_query)
        sql_data = list(sql_data)

        conn.commit()
        conn.close()
    except Exception as e :
        print("get_expense_list function  Exception : ",e)
        sql_data = []
    finally :
        return jsonify(sql_data)




@app.route('/edit_expense_list', methods=['POST'])
def edit_expense_list():
    db_path_expense_list = os.path.join(WORKING_DIR,"Dependency",'Expense.db')
    res_code = "1000"

    try :
        post_json = request.json
    except :
        post_json = {}

    try :
        conn = sqlite3.connect(db_path_expense_list)
        cur = conn.cursor()  
        sql_query = "UPDATE EXPENSE SET TYPE ='{}', NAME ='{}', DATE ='{}', AMOUNT ='{}' WHERE USERNAME ='{}' AND PASSWORD ='{}' AND TYPE ='{}' AND NAME ='{}' AND DATE ='{}' AND AMOUNT ='{}'".format(post_json['TYPE'],post_json['NAME'],post_json['DATE'],post_json['AMOUNT'],post_json['USERNAME'],post_json['PASSWORD'],post_json['INITIAL_JSON']['TYPE'],post_json['INITIAL_JSON']['NAME'],post_json['INITIAL_JSON']['DATE'],post_json['INITIAL_JSON']['AMOUNT'])
        cur.execute(sql_query)
        conn.commit()
        conn.close()

        res_code = "1001"

    except Exception as e :
        print("edit_expense_list function  Exception : ",e)
        res_code = "1000"
    finally :
        return res_code





@app.route('/remove_expense_list', methods=['POST'])
def remove_expense_list():
    db_path_expense_list = os.path.join(WORKING_DIR,"Dependency",'Expense.db')
    res_code = "1000"

    try :
        post_json = request.json
    except Exception as r :
        post_json = {}

    try :
        conn = sqlite3.connect(db_path_expense_list)
        cur = conn.cursor()  
        sql_query = "DELETE FROM EXPENSE WHERE USERNAME='{}' AND PASSWORD='{}' AND TYPE='{}' AND NAME='{}' AND DATE='{}' AND AMOUNT='{}'".format(post_json['USERNAME'],post_json['PASSWORD'],post_json['TYPE'],post_json['NAME'],post_json['DATE'],post_json['AMOUNT'])
        cur.execute(sql_query)
        conn.commit()
        conn.close()
        
        res_code = "1001"

    except Exception as e :
        print("remove_expense_list function  Exception : ",e)
        res_code = "1000"
    finally :
        return res_code


@app.route('/create_expense_list', methods=['POST'])
def create_expense_list():
    db_path_expense_list = os.path.join(WORKING_DIR,"Dependency",'Expense.db')
    res_code = "1000"

    try :
        post_json = request.json
    except Exception as r :
        post_json = {}


    try :
        conn = sqlite3.connect(db_path_expense_list)
        cur = conn.cursor()  
        sql_query = "INSERT INTO EXPENSE VALUES('{}','{}','{}', '{}','{}', '{}')".format(post_json['USERNAME'],post_json['PASSWORD'],post_json['TYPE'],post_json['NAME'],post_json['DATE'],post_json['AMOUNT'])
        cur.execute(sql_query)
        conn.commit()
        conn.close()
        
        res_code = "1001"

    except Exception as e :
        print("remove_expense_list function  Exception : ",e)
        res_code = "1000"
    finally :
        return res_code



# try :
#     webbrowser.open('http://127.0.0.1:5000', new=1)
# except :
#     pass



if __name__ == '__main__':
    app.run(port=5000)