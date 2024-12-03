function verticalTree(config, $container, svgNS) {
  this.config = config
  this.$container = $container
  this.svgNS = svgNS
  this.draw()
  this.toCenter()
}

verticalTree.prototype = {
  temp: function () {
    console.log(111)
    this.config.nodes = [
      {
        id: 1,
        name: 'node1',
        expanded: true,
        children: [
          {
            id: 2,
            name: 'node2',
            children: [
              {
                id: 12,
                name: 'node12'
              },
              {
                id: 13,
                name: 'node13'
              },
              {
                id: 14,
                name: 'node14'
              },
              {
                id: 15,
                name: 'nod15'
              }
            ]
          },
          {
            id: 3,
            name: 'node3',
            children: [
              {
                id: 32,
                name: 'node32'
              },
              {
                id: 33,
                name: 'node33'
              },
              {
                id: 34,
                name: 'node34'
              },
              {
                id: 35,
                name: 'nod35'
              }
            ]
          },
          {
            id: 4,
            name: 'node4'
          },
          {
            id: 5,
            name: 'node5',
            expanded: true,
            children: [
              {
                id: 52,
                name: 'node52'
              },
              {
                id: 53,
                name: 'node53'
              },
              {
                id: 54,
                name: 'node54'
              },
              {
                id: 55,
                name: 'nod55'
              }
            ]
          },
          {
            id: 6,
            name: 'node6',
            expanded: true,
            children: [
              {
                id: 62,
                name: 'node62'
              }
            ]
          }
        ]
      }
    ]
  },

  /**
   * 绘制节点
   * @param nodes 节点信息
   * @param pos 位置信息
   */
  draw: function (nodes, pos, curLevel, parent) {
    if (!nodes) {
      //  this.temp();
      nodes = this.config.nodes
      pos = { level0: { top: 10, left: 20 } }
      curLevel = 0
      parent = { id: -1 }
    }
    if (!parent.id) {
      parent.id = Math.floor(Math.random() * 100000)
    }
    let that = this
    let nodeW = that.config.marginLeft + that.config.nodeW
    $.each(nodes, function (d, node) {
      let $node = that.drawNode(node, parent)
      if (node.children && node.expanded) {
        if (!pos['level' + (curLevel + 1)]) {
          pos['level' + (curLevel + 1)] = {
            left: 0,
            top: pos['level' + curLevel].top + that.config.distance
          }
          if (node.children.length === 1) {
            pos['level' + (curLevel + 1)] = {
              left: pos['level' + curLevel].left,
              top: pos['level' + curLevel].top + that.config.distance
            }
          }
        }

        let W = that.draw(node.children, pos, curLevel + 1, node)
        let nextLeft = pos['level' + (curLevel + 1)].from
        if (isNaN(W)) {
          W = 0
        }
        if (nextLeft > pos['level' + curLevel].left - W / 2) {
          if (
            nextLeft + W / 2 < pos['level' + curLevel].left + nodeW &&
            d > 0
          ) {
            pos['level' + curLevel].left = pos['level' + curLevel].left + nodeW
          } else {
            pos['level' + curLevel].left = nextLeft + W / 2
          }
        } else {
          pos['level' + curLevel].left += W / 2
        }
        if (
          pos['level' + curLevel].left - W / 2 !==
          pos['level' + (curLevel + 1)].from
        ) {
          pos['level' + (curLevel + 1)].left =
            pos['level' + curLevel].left - W / 2 - nodeW
          $("div[pid='" + node.id + "']").remove()
          that.draw(node.children, pos, curLevel + 1, node)
        }
      } else if (d > 0 || pos['level' + curLevel].left !== 0) {
        pos['level' + curLevel].left += nodeW
      }
      node.top = pos['level' + curLevel].top
      node.left = pos['level' + curLevel].left
      $node.css('top', node.top).css('left', node.left)
      if (d === 0) {
        pos['level' + curLevel].from = pos['level' + curLevel].left
      }
      that.drawLine(node, parent)
    })
    return pos['level' + curLevel].left - pos['level' + curLevel].from
  },
  /**
   * 画节点信息
   * @param node 节点
   * @returns 节点元素
   */
  drawNode: function (node, parent) {
    let that = this
    let $div = $('<div/>')
    let $content = $('<div/>')
    let $svg = $("<svg height='12' width = '1'/>")
    let $expand = $('<div/>')
    let $bock = $('<div/>')
    let $span = $('<span/>')
    $content.text(node.name)
    this.config.nodeCallBack($content, node, parent.id)
    $div.append($content).attr('pid', parent.id)
    if (node.children && node.children.length > 0) {
      let path = document.createElementNS(this.svgNS, 'path')
      path.setAttribute('fill', 'none')
      path.setAttribute('stroke', this.config.lineColor)
      path.setAttribute('stroke-width', '1')
      path.setAttribute('d', 'M0.5,0L0.5,12Z')
      $svg
        .append($(path))
        .css('left', this.config.nodeW / 2)
        .css('position', 'absolute')
        .css('top', '100%')

      if (node.children && node.children.length > 0) {
        if (node.expanded) {
          $bock.append($span)
        } else {
          $bock.text(node.children.length)
        }
      }
      $expand
        .append($bock)
        .attr(
          'style',
          'left: ' +
            (this.config.nodeW / 2 - 12) +
            'px; align-items: center;border-radius: 12px;cursor: pointer;display: flex;font-weight: 500;height: 24px;justify-content: center;margin-top: 12px;position: absolute;text-align: center;top: 100%;width: 24px;z-index: 1;'
        )
      $bock.attr(
        'style',
        'align-items: center;background: #fff;border: none;border-radius: 10px;box-shadow: 0 1px 10px rgba(31, 35, 41, .08);color: #646a73;display: flex;font-size: 12px;height: 20px;justify-content: center;line-height: 0;min-width: auto !important;padding: 0;vertical-align: top;width: 20px;'
      )
      $span.attr(
        'style',
        'background: #646a73;border-radius: 2px;height: 2px;width: 8px;'
      )

      $div.append($svg).append($expand)
      $expand.click(function () {
        node.expanded = !node.expanded
        that.redraw()
      })
    }
    $div
      .css('position', 'absolute')
      .css('background-color', this.config.nodeColor)
      .width(this.config.nodeW)
      .height(this.config.nodeH)
      .css('box-shadow', '0 6px 16px -8px rgba(0, 0, 0, 0.5)')
    this.$container.append($div)
    return $div
  },
  /**
   * 画线
   * @param node
   */
  drawLine: function (node, parent) {
    const isChildrenc = node.children && node.children.length > 0
    if (!isChildrenc || !node.expanded) return
    let that = this
    let $div = $('<div/>')
    let H = this.config.distance - this.config.nodeH - 36 //node.children[node.children.length - 1].top - node.children[0].top;
    let W = node.children[node.children.length - 1].left - node.children[0].left
    let top = node.top + this.config.nodeH + 36
    let left = node.children[0].left + this.config.nodeW / 2
    let $svg = $(
      "<svg height='" +
        (H === 0 ? 1 : H) +
        "' width = '" +
        (W === 0 ? 1 : W) +
        "'/>"
    )
    $div
      .width(W === 0 ? 1 : W)
      .height(H)
      .css('top', top)
      .css('left', left)
      .css('position', 'absolute')
    $div.append($svg).attr('pid', parent.id)
    this.$container.append($div)
    let path = document.createElementNS(that.svgNS, 'path')
    let dp = ''
    if (node.children.length === 1) {
      $svg.attr('width', 1)
      dp = 'M0.5 0 L0.5 ' + H
      path.setAttribute('d', dp)
      path.setAttribute('fill', 'none')
      path.setAttribute('stroke', that.config.lineColor)
      $(path).appendTo($svg)
      return
    }
    dp =
      'M' +
      (node.left + this.config.nodeW / 2 - left) +
      ' 0 L' +
      (node.left + this.config.nodeW / 2 - left) +
      ' ' +
      (H - 36) / 2
    dp += ' M0 ' + (H - 36) / 2 + ' L' + W + ' ' + (H - 36) / 2
    $.each(node.children, function (d, l) {
      let x = l.left - left + that.config.nodeW / 2
      if (d === 0) {
        x += 1
      } else if (d === node.children.length - 1) {
        x -= 1
      }
      dp +=
        ' M' +
        x +
        ' ' +
        (H - 36) / 2 +
        ' L' +
        x +
        ' ' +
        (that.config.distance - that.config.nodeH - 36)
    })
    path.setAttribute('d', dp)
    path.setAttribute('fill', 'none')
    path.setAttribute('stroke', that.config.lineColor)
    $(path).appendTo($svg)
  },
  redraw: function () {
    this.$container.empty()
    this.draw()
    this.toCenter()
  },
  toCenter: function () {
    let width = this.$container.parent().width()
    let midLeft = (width - this.config.nodeW) / 2
    let moveDistance = midLeft - this.config.nodes[0].left
    this.$container.children().each((d, ele) => {
      let $ele = $(ele)
      let left = $(ele).position().left
      $ele.css('left', left + moveDistance)
    })
  }
}
