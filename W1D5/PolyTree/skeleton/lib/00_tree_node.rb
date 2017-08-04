class PolyTreeNode
  attr_accessor :value, :parent, :children

  def initialize(val)
    @value = val
    @parent = nil
    @children = []
  end

  def parent=(node)
    return if @parent == node # don't assign the same parent twice
    @parent.children.reject!{|n| n == self} unless @parent.nil?
    @parent = node
    node.add_child(self) unless node.nil?
  end

  def add_child(node)
    @children << node unless @children.include? node #|| node.nil?
    node.parent = self unless node.parent == self
  end

    def remove_child(node)
      raise unless @children.include? node

      node.parent = nil
      @children.reject!{|n| n == node }
    end

    def dfs(target)
      return self if @value == target

      @children.each do |n|
        item = n.dfs(target)
        return item if !item.nil? && item.value == target
      end

      nil
    end

    def bfs(target)
      queue = [self]

      until queue.empty?
        curr = queue.shift
        return curr if curr.value == target
        queue.concat(curr.children)
      end

      nil
    end
end
