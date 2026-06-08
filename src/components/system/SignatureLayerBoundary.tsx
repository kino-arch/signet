'use client'
import { Component } from 'react'
import type { ReactNode } from 'react'

export class SignatureLayerBoundary extends Component<{ children: ReactNode, fallback: ReactNode }> {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}
