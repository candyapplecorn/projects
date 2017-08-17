class RenameColumnAuthorId < ActiveRecord::Migration[5.1]
  def change
    rename_column :shortened_urls, :author_id, :submitter_id
  end
end
