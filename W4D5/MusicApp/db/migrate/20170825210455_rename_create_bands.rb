class RenameCreateBands < ActiveRecord::Migration[5.1]
  def change
    rename_column :bands, :CreateBands, :name
  end
end
