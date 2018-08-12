import React, { Component } from 'react';
import { Form, Select, Input, Button, Col, Row, Alert, Spin, message } from 'antd';
import axios from 'axios';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const hostname = process.env.NODE_ENV === 'production' ? '/hide' : 'http://localhost:3050/hide';

class MainForm extends Component{
  state = {
    disabled: true,
    loading: false,
    url: null,
  };
  
  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (err !== null) return;
      this.setState({ loading: true });
      const { data: { error, url } }  = await axios.post(hostname, values);
      
      if (error) {
        message.error(error);
      } else {
        message.success('Готово! Ссылка получена')
      }
      this.setState({ loading: false, url });
    })
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { disabled, loading, url } = this.state;
    
    return (
      <Row type="flex">
        <Col span={8} style={{ padding: 30}}>
          <Form onSubmit={this.onSubmit}>
            <Form.Item
              {...formItemLayout}
              label="URL ссылка"
            >
              {getFieldDecorator('url', {
                rules: [{
                  required: true, message: 'Введите URL',
                }]
              })(
                <Input placeholder="your url" />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Тип реферерра"
            >
              {getFieldDecorator('reftype', {
                initialValue: '0'
              })(
                <Select onChange={(v) => this.setState({ disabled: v === '3' ? !v : !!v })}>
                  <Select.Option value="0">Direct link</Select.Option>
                  <Select.Option value="1">Hide Referrer</Select.Option>
                  <Select.Option value="3">Google Referrer</Select.Option>
                  <Select.Option value="4">Twitter Referrer</Select.Option>
                  <Select.Option value="5">StumbleUpon Referrer</Select.Option>
                  <Select.Option value="8">SimilarSites.com Referrer</Select.Option>
                  <Select.Option value="9">DuckDuckGo.com Referrer</Select.Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Ключевые слова"
            >
              {getFieldDecorator('keywords')(
                <Input placeholder="keywords" disabled={disabled} />
              )}
            </Form.Item>
            {/*<Form.Item*/}
            {/*{...formItemLayout}*/}
            {/*label="Google TLD"*/}
            {/*>*/}
            {/*{getFieldDecorator('tld')(*/}
            {/*<Input placeholder=".com" disabled={disabled} />*/}
            {/*)}*/}
            {/*</Form.Item>*/}
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">Создать ссылку</Button>
            </Form.Item>
          </Form>
        </Col>
        <Col
          style={{ display: 'flex', flex: 1, justifyContent: 'space-around', alignItems: 'center' }}
        >
          <Spin size="large" spinning={loading}>
            {url ? (
                <Alert
                  message="🤗"
                  description={<a href={url} target="_blank">{url}</a>}
                  type="success"
                  showIcon
                />
              )
              : (
                <Alert
                  message="Привет"
                  description="Твоя ссылка будет здесь"
                  type="info"
                  showIcon
                />
              )}
          </Spin>
        </Col>
      </Row>
    );
  }
}

export default Form.create()(MainForm);
