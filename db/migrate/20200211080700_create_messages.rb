class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.string  :content
      t.string  :image
      t.integer :user_id,   foreign_key: true
      t.integer :group_id,  foreign_key: true
      t.timestamps
    end
  end
end
