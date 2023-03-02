import React from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { Checkbox, Transfer, Tree } from 'antd';

const RoleAuthorizationTreeTransfer = ({ dataSource, targetKeys, ...restProps }) => {
    const transferDataSource = [];
    function flatten(list = []) {
        list.forEach((item) => {
            transferDataSource.push(item);
            flatten(item.children);
        });
    }
    flatten(dataSource);

    const generateTreeRight = (treeNodes = [], checkedKeys = []) =>
        treeNodes
            .filter((item) => {
                if (item.children) {
                    return item?.children?.some((item) => targetKeys.includes(item.key));
                }
                return targetKeys.includes(item.key);
            })
            .map(({ children, ...props }, i) => {
                return {
                    ...props,
                    title: children ? (
                        <div>
                            {props.title} {allChildControl(props.key)}
                        </div>
                    ) : (
                        props.title
                    ),
                    children: generateTreeRight(children, checkedKeys),
                };
            });

    const allChildControl = (key) => {
        let checker = (arr, target) => target.every((v) => arr.includes(v));
        const dataSourceItemsChilds = dataSource.find((item) => item.key === key)?.children.map((item) => item.key);
        return checker(targetKeys, dataSourceItemsChilds) ? (
            <CheckOutlined style={{ fontSize: '20px', color: '#008606' }} />
        ) : (
            ''
        );
    };

    const generateTreeLeft = (treeNodes = [], checkedKeys = []) => {
        return treeNodes
            .filter((item) => {
                if (item.children) {
                    return !item?.children?.every((item) => targetKeys.includes(item.key));
                }
                return !targetKeys.includes(item.key);
            })
            .map(({ children, ...props }) => ({
                ...props,
                children: generateTreeLeft(children, checkedKeys),
            }));
    };

    let getAllKeys = (tree) => {
        let result = [];
        tree.forEach((x) => x.children.forEach((item) => result.push(item.key)));
        return result;
    };

    const allKeysLeft = getAllKeys(generateTreeLeft(dataSource));
    const allKeysRight = getAllKeys(generateTreeRight(dataSource));

    return (
        <Transfer
            {...restProps}
            targetKeys={targetKeys}
            dataSource={transferDataSource}
            className="tree-transfer"
            render={(item) => item.title}
            showSelectAll={false}
            selectAllLabels={[
                <span>Bu role atanmamış yetkiler, {allKeysLeft.length} yetki</span>,
                <span>Bu role atanmış yetkiler, {allKeysRight.length} yetki</span>,
            ]}
        >
            {({ direction, onItemSelectAll, selectedKeys }) => {
                if (direction === 'left') {
                    const onChange = () => {
                        if (selectedKeys.length === allKeysLeft.length) {
                            onItemSelectAll(allKeysLeft, false);
                        } else {
                            onItemSelectAll(allKeysLeft, true);
                        }
                    };
                    return (
                        <>
                            {allKeysLeft.length > 0 && (
                                <Checkbox
                                    onChange={onChange}
                                    style={{ height: '42px', padding: '10px 23px' }}
                                    checked={selectedKeys.length === allKeysLeft.length ? true : false}
                                >
                                    Tümünü Seç
                                </Checkbox>
                            )}
                            <Tree
                                blockNode
                                checkable
                                selectable={false}
                                height={233}
                                checkedKeys={selectedKeys}
                                treeData={generateTreeLeft(dataSource)}
                                onCheck={(_, { checked, node, halfCheckedKeys }) => {
                                    let keys;
                                    if (node.children.length) {
                                        keys = [...node.children.map((item) => item.key)];
                                    } else {
                                        keys = [node.key];
                                    }
                                    if (!checked) {
                                        keys = [node.key, ...keys, ...halfCheckedKeys];
                                    }
                                    onItemSelectAll(keys, checked);
                                }}
                            />
                        </>
                    );
                } else {
                    const onChange = () => {
                        if (selectedKeys.length === allKeysRight.length) {
                            onItemSelectAll(allKeysRight, false);
                        } else {
                            onItemSelectAll(allKeysRight, true);
                        }
                    };

                    return (
                        <>
                            {allKeysRight.length > 0 ? (
                                <Checkbox
                                    onChange={onChange}
                                    checked={selectedKeys.length === allKeysRight.length ? true : false}
                                    style={{ height: '42px', padding: '10px 23px' }}
                                >
                                    Tümünü Seç
                                </Checkbox>
                            ) : (
                                <div style={{ color: 'red', textAlign: 'center' }}>Henüz bir yetki atanmamıştır</div>
                            )}
                            <Tree
                                blockNode
                                checkable
                                selectable={false}
                                height={233}
                                checkedKeys={selectedKeys}
                                treeData={generateTreeRight(dataSource)}
                                onCheck={(_, { checked, node, halfCheckedKeys }) => {
                                    let keys;
                                    if (node.children.length) {
                                        keys = [...node.children.map((item) => item.key)];
                                    } else {
                                        keys = [node.key];
                                    }
                                    if (!checked) {
                                        keys = [node.key, ...keys, ...halfCheckedKeys];
                                    }

                                    onItemSelectAll(keys, checked);
                                }}
                            />
                        </>
                    );
                }
            }}
        </Transfer>
    );
};

export default RoleAuthorizationTreeTransfer;
