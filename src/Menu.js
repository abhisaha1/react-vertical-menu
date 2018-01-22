import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class Menu extends Component {
    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
        this.setActiveRoute = this.setActiveRoute.bind(this);
        this.state = {
            data: this.props.data,
            permissions: this.props.permissions || [],
            selected: this.props.selected
        };
    }

    onSelect(data) {
        const newData = this.props.data.map(item => {
            if (item.label === data.label) {
                return data;
            }
            return item;
        });
        this.setState({ data: newData });
    }

    setActiveRoute(e, data) {
        this.setState({ selected: data.slug });
    }

    render() {
        const tree = this.state.data.map(child => (
            <TreeNode
                permissions={this.state.permissions}
                key={child.id}
                data={child}
                selected={this.state.selected}
                setSelection={this.onSelect}
                setActiveRoute={this.setActiveRoute}
            />
        ));

        return <ul className={this.props.parentClass}>{tree}</ul>;
    }
}
Menu.propTypes = {
    data: PropTypes.array,
    permissions: PropTypes.array,
    selected: PropTypes.string,
    parentClass: PropTypes.string
};
Menu.defaultProps = {
    parentClass: "rvm--parent"
};

class TreeNode extends Component {
    constructor(props) {
        super(props);
        this.state = { collapsed: true, selected: "" };
        this.onClick = this.onClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let newState = {};
        if ("collapsed" in nextProps.data && !nextProps.data.collapsed) {
            newState.collapsed = nextProps.data.collapsed;
        }
        newState.selected =
            nextProps.data.slug === nextProps.selected ? "active" : "";
        this.setState(newState);
    }

    onClick(e) {
        e.preventDefault();
        this.setState({
            collapsed: !this.state.collapsed
        });
        this.props.data.collapsed = !this.state.collapsed;
        this.props.setSelection(this.props.data);
    }

    render() {
        const checkPerm = permission =>
            this.props.permissions.indexOf(permission) !== -1;

        let subtree = null;
        if (this.props.data.children) {
            subtree = this.props.data.children
                .sort((a, b) => a.priority - b.priority)
                .map(child => (
                    <TreeNode {...this.props} key={child.id} data={child} />
                ));
        }

        let containerClassName = "collapse in ";
        let linkclass = "accordian-heading ";
        let treeState = "open";
        if (this.state.collapsed) {
            linkclass += "collapsed";
            treeState = "";
            containerClassName = "collapse";
        }
        let hasPerms = true;
        const itemPermissions = this.props.data.permissions;
        if (itemPermissions && itemPermissions.length > 0) {
            hasPerms =
                itemPermissions.filter(name => {
                    return checkPerm(name);
                }).length > 0;
        }
        if (!hasPerms) {
            return <div />;
        }

        if (subtree) {
            return (
                <li className={"rvm--has-sub " + treeState}>
                    <Link
                        href="#"
                        to=""
                        className={linkclass}
                        onClick={this.onClick}
                        data-id={this.props.data.id}
                    >
                        {this.props.data.icon && (
                            <i
                                className={"menu-icon " + this.props.data.icon}
                            />
                        )}
                        <span>{this.props.data.label}</span>
                    </Link>
                    <ul className={containerClassName + " nav nav-list"}>
                        {subtree}
                    </ul>
                </li>
            );
        }
        return (
            <li className={"tree-node-leaf " + this.state.selected}>
                <Link
                    data-id={this.props.data.id}
                    to={"/admin/" + this.props.data.slug}
                    onClick={e => this.props.setActiveRoute(e, this.props.data)}
                >
                    {this.props.data.icon && (
                        <i className={"menu-icon " + this.props.data.icon} />
                    )}
                    <span>{this.props.data.label}</span>
                </Link>
            </li>
        );
    }
}

TreeNode.propTypes = {
    setSelection: PropTypes.func,
    data: PropTypes.object,
    selected: PropTypes.string,
    permissions: PropTypes.array,
    setActiveRoute: PropTypes.func
};

export default Menu;
