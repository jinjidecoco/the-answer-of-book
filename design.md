# 答案之书小程序设计文档

## 一、项目概述
**定位**：基于《答案之书》核心逻辑的轻量级互动小程序，通过随机算法为用户提供趣味性答案，辅助决策或提供心灵慰藉[1,4](@ref)。  
**目标用户**：18-35岁年轻群体，偏好神秘学、社交娱乐场景的用户。

---

## 二、核心功能设计
### 1. 基础功能模块
| 模块            | 设计要点                                                                                 | 技术实现参考                                                                                    |
| --------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| ​**随机答案**   | - 用户输入问题后，触发随机算法从答案库抽取结果<br>- 答案展示搭配动态特效（如旋转、渐显） | 预存答案文本+随机索引（网页2方案）<br>动画库：`animate.css`或微信原生`createAnimation`（网页3） |
| ​**每日一言**   | - 每日首次打开推送一句哲理/幽默语录<br>- 支持分享至社交平台                              | 定时任务+独立语录库<br>分享接口调用（网页4）                                                    |
| ​**交互仪式感** | - 长按图腾触发答案（3秒等待动画）<br>- 答案页增加「再试一次」按钮                        | CSS3边框动画（网页3代码片段）<br>悬浮窗控件动态切换（网页2脚本逻辑）                            |

### 2. 扩展功能（可选）
- ​**用户自定义答案库**：允许用户上传个性化答案，需审核后生效（参考网页1知识库管理）  
- ​**社交裂变**：生成答案海报，附带小程序码引导传播（网页4未来计划）  

---

## 三、技术栈选型
### 前端实现
| 分类        | 技术方案                                                               | 优势说明                                           |
| ----------- | ---------------------------------------------------------------------- | -------------------------------------------------- |
| ​**框架**   | Uniapp + Vue3（网页4）                                                 | 跨平台兼容微信/支付宝小程序，组合式API提升开发效率 |
| ​**动画**   | - 基础动画：`animate.css`（网页3）<br>- 复杂特效：`wx.createAnimation` | 实现「五芒星旋转」「文字缩放」等效果               |
| ​**UI组件** | uView UI库 + 自定义悬浮窗控件（网页2）                                 | 快速构建按钮、文字控件等交互元素                   |

### 后端实现
| 模块          | 技术方案                           | 功能说明                                                                     |
| ------------- | ---------------------------------- | ---------------------------------------------------------------------------- |
| ​**核心架构** | SpringBoot + MyBatis Plus（网页4） | 快速构建RESTful API，支持答案库CRUD操作                                      |
| ​**数据库**   | MySQL 8.0                          | 存储答案库（字段：`id`,`content`,`type`）、用户行为日志（网页1数据管理需求） |
| ​**部署**     | Docker + Nginx                     | 容器化部署保障高可用性                                                       |

---

## 四、详细设计方案
### 1. 交互流程
```mermaid
graph TD
    A[用户打开小程序] --> B{首页}
    B --> |点击「寻找答案」| C[长按图腾3秒]
    C --> D[播放旋转动画]
    D --> E[显示随机答案]
    E --> F{操作选择}
    F --> |再试一次| C
    F --> |分享| G[生成社交海报]
    G --> H[分享至社交平台]
    H --> I[用户打开小程序]
    
