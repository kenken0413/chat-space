<<<<<<< HEAD
# DB設計案
## users table
|column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|string|null: false, add_index|
|email|text|null: false|
|password|text|null: false|
### Association
 - has_many :comments
 - has_many :groups, through: :groups_users
 - has_many :groups_users

## comments table
|column|Type|Options|
|------|----|-------|
|text|text||
|image|string||
|user|integer|null: false, foreign_key:true|
|group|integer|null: false, foreign_key:true|
### Association
- belongs_to :user
- belongs_to :group

## groups table
|column|Type|Options|
|------|----|-------|
|id|int|null: false|
|name|string|null: false| 
### Association
- has_many :users, through: :groups_users
- has_many :comments
- has_many :groups_users

## groups_users table
|column|Type|Options|
|------|----|-------|
|user|integer|null: false, foreign_key:true|
|group|integer|null: false, foreign_key:true|
### Association
- belongs_to :user
- belongs_to :group
=======
# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
>>>>>>> parent of 8ce9046... DB設計
