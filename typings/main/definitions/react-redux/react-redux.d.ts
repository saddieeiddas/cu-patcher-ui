// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/andrew-w-ross/typings-redux/master/redux.d.ts
declare module 'react-redux~redux/redux' {
module redux {
	//This should be extended
	export interface IAction {
		type: string | number;
	}

	export interface IActionGeneric<TPayload> extends IAction {
		payload?: TPayload;
		error?: Error;
		meta?: any;
	}

	export interface IReducer<TState> {
		(state: TState, action: IAction): TState;
	}

	export interface IReducerMap {
		[key: string]: IReducerMap | IReducer<any>
	}

	export interface IDispatch {
		(action: IAction): IAction;
	}

	export interface IMiddlewareStore<TState> {
		getState(): TState;

		dispatch: IDispatch;
	}

	export interface IStore<TState> extends IMiddlewareStore<TState> {
		subscribe(listener: (state: TState) => any): () => void;

		replaceReducer(nextReducer: IReducer<TState>): void;
	}

	export interface IMiddleware<State> {
		(middlewareStore: IMiddlewareStore<State>): (next: IDispatch) => IDispatch;
	}

	export interface ICreateStoreGeneric<TState> {
		(reducer: IReducer<TState>, initialState?: TState): IStore<TState>;
	}

	export interface IStoreEnhancerGeneric<TState> {
		(createStore: ICreateStoreGeneric<TState>): ICreateStoreGeneric<TState>;
	}

	export function createStore<TState>(reducer: IReducer<TState>, initialState?: TState): IStore<TState>;

	export function combineReducers(reducers: IReducerMap): IReducer<any>;
	export function combineReducers<TState>(reducers: IReducerMap): IReducer<TState>;

	export function applyMiddleware<TState>(...middlewares: IMiddleware<TState>[]): IStoreEnhancerGeneric<TState>;

	export function bindActionCreators<TActionCreator extends Function | { [key: string]: Function }>(actionCreators: TActionCreator, dispatch: IDispatch): TActionCreator;

	export function compose<TArg>(...functions: { (arg: TArg): TArg }[]): (arg: TArg) => TArg;
	export function compose(...functions: { (arg: any): any }[]): (arg: any) => any;
}

export = redux;
}
declare module 'react-redux~redux' {
import main = require('react-redux~redux/redux');
export = main;
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/andrew-w-ross/typings-react-redux/6be88a57427f8ec220cad13d68565fd5f5711146/react-redux.d.ts
declare module 'react-redux/react-redux' {

import * as React from 'react';
import {IStore, IDispatch} from 'react-redux~redux';

module ReactRedux {
	
	export class Provider extends React.Component<{store:IStore<any>},{}>{}	

	export interface IMapStateToProps {
		(state: any, ownProps?: any): Object;
	}

	export interface IMapDispatchToProps {
		(dispatch: IDispatch, ownProps?: any): Object;
	}

	export interface IConnectOptions {
		pure?: boolean;
		withRef?: boolean;
	}

	export function connect<TElement extends Function>(
		mapStateToProps?: IMapStateToProps,
		mapDispatchToProps?: IMapDispatchToProps,
		mergeProps?: (stateProps: Object, dispatchProps: Object, ownProps: Object) => Object,
		options?: IConnectOptions
	): TElement;
}

export = ReactRedux;
}
declare module 'react-redux' {
import main = require('react-redux/react-redux');
export = main;
}