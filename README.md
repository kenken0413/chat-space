# DB設計
## users table
|column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|text|null: false|
|email|text|null: false|
|password|text|null: false|
### Association
 - has_many :comments
 - has_many :groups, through: :groups_users

## comments table
|column|Type|Options|
|------|----|-------|
|text|text||
|image|text||
|user_id|integer|null: false, foreign_key:true|
|group_id|integer|null: false, foreign_key:true|
### Association
- belongs_to :user
- belongs_to :groups

## groups table
|column|Type|Options|
|------|----|-------|
|id|int|null: false|
|name|text|null: false| 
|users_id|integer|null: false, foreign_key:true|
|comment_id|integer|foreign_key:true|
### Association
- has_many :users, through: :groups_users
- has_many :comments

## groups_users table
|column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key:true|
|group_id|integer|null: false, foreign_key:true|
### Association
- belongs_to :user
- belongs_to :comment
