class AddMetaTable < ActiveRecord::Migration[6.1]
  def up
    create_table :meta, id: :uuid do |t|
      t.string :group, null: false, index: true
      t.string :key, null: false, index: true
      t.string :value, null: false
    end

    add_index(:meta, [:group, :key], unique: true)

    Meta.create!(group: 'content', key: 'about', value: '# About Text')
    Meta.create!(group: 'socials', key: 'Twitter', value: 'https://example.com/twitter')
    Meta.create!(group: 'socials', key: 'Gumroad', value: 'https://example.com/gumroad')
    Meta.create!(group: 'socials', key: 'Patreon', value: 'https://example.com/patreon')
    Meta.create!(group: 'socials', key: 'Discord', value: 'https://example.com/discord')
    Meta.create!(group: 'socials', key: 'Instagram', value: 'https://example.com/instagram')
    Meta.create!(group: 'socials', key: 'Deviant Art', value: 'https://example.com/deviantart')
  end

  def down
    drop_table :meta
  end
end
