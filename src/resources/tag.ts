import {
  Tag,
  TagGroup,
  CreateTagRequest,
  UpdateTagRequest,
  CreateTagGroupRequest,
  TagListParams,
  TagAssignment,
  TagStats,
  BulkTagRequest,
  BulkTagResponse,
  TagSuggestion,
  AutoTagRule
} from '../types/tag';
import { BaseResource } from './base';

export class TagResource extends BaseResource {
  /**
   * Get list of tags
   */
  async list(shopId: string, params?: TagListParams): Promise<{
    data: Tag[];
  }> {
    return this.client.get(`/shops/${shopId}/tags`, params);
  }

  /**
   * Get tag by ID
   */
  async getById(shopId: string, tagId: string): Promise<Tag> {
    return this.client.get(`/shops/${shopId}/tags/${tagId}`);
  }

  /**
   * Create new tag
   */
  async create(shopId: string, data: CreateTagRequest): Promise<Tag> {
    return this.client.post(`/shops/${shopId}/tags`, data);
  }

  /**
   * Update tag
   */
  async update(shopId: string, tagId: string, data: UpdateTagRequest): Promise<Tag> {
    return this.client.put(`/shops/${shopId}/tags/${tagId}`, data);
  }

  /**
   * Delete tag
   */
  async delete(shopId: string, tagId: string): Promise<void> {
    return this.client.delete(`/shops/${shopId}/tags/${tagId}`);
  }

  /**
   * List tag groups
   */
  async listGroups(shopId: string, type?: string): Promise<{
    data: TagGroup[];
  }> {
    return this.client.get(`/shops/${shopId}/tag-groups`, { type });
  }

  /**
   * Create tag group
   */
  async createGroup(shopId: string, data: CreateTagGroupRequest): Promise<TagGroup> {
    return this.client.post(`/shops/${shopId}/tag-groups`, data);
  }

  /**
   * Update tag group
   */
  async updateGroup(shopId: string, groupId: string, data: Partial<CreateTagGroupRequest>): Promise<TagGroup> {
    return this.client.put(`/shops/${shopId}/tag-groups/${groupId}`, data);
  }

  /**
   * Delete tag group
   */
  async deleteGroup(shopId: string, groupId: string): Promise<void> {
    return this.client.delete(`/shops/${shopId}/tag-groups/${groupId}`);
  }

  /**
   * Get resource tags
   */
  async getResourceTags(
    shopId: string,
    resourceType: string,
    resourceId: string
  ): Promise<{ data: TagAssignment[] }> {
    return this.client.get(
      `/shops/${shopId}/${resourceType}/${resourceId}/tags`
    );
  }

  /**
   * Add tags to resource
   */
  async addTagsToResource(
    shopId: string,
    resourceType: string,
    resourceId: string,
    tagIds: string[]
  ): Promise<TagAssignment[]> {
    return this.client.post(
      `/shops/${shopId}/${resourceType}/${resourceId}/tags`,
      { tag_ids: tagIds }
    );
  }

  /**
   * Remove tag from resource
   */
  async removeTagFromResource(
    shopId: string,
    resourceType: string,
    resourceId: string,
    tagId: string
  ): Promise<void> {
    return this.client.delete(
      `/shops/${shopId}/${resourceType}/${resourceId}/tags/${tagId}`
    );
  }

  /**
   * Get tag statistics
   */
  async getStats(shopId: string): Promise<TagStats> {
    return this.client.get(`/shops/${shopId}/tags/stats`);
  }

  /**
   * Bulk tag resources
   */
  async bulkTag(shopId: string, data: BulkTagRequest): Promise<BulkTagResponse> {
    return this.client.post(`/shops/${shopId}/tags/bulk`, data);
  }

  /**
   * Get tag suggestions for resource
   */
  async getSuggestions(
    shopId: string,
    resourceType: string,
    resourceId: string
  ): Promise<{ data: TagSuggestion[] }> {
    return this.client.get(
      `/shops/${shopId}/${resourceType}/${resourceId}/tag-suggestions`
    );
  }

  /**
   * List auto-tag rules
   */
  async listAutoTagRules(shopId: string, type?: string): Promise<{
    data: AutoTagRule[];
  }> {
    return this.client.get(`/shops/${shopId}/auto-tag-rules`, { type });
  }

  /**
   * Create auto-tag rule
   */
  async createAutoTagRule(shopId: string, data: Omit<AutoTagRule, 'id' | 'created_at' | 'updated_at'>): Promise<AutoTagRule> {
    return this.client.post(`/shops/${shopId}/auto-tag-rules`, data);
  }

  /**
   * Update auto-tag rule
   */
  async updateAutoTagRule(shopId: string, ruleId: string, data: Partial<AutoTagRule>): Promise<AutoTagRule> {
    return this.client.put(`/shops/${shopId}/auto-tag-rules/${ruleId}`, data);
  }

  /**
   * Delete auto-tag rule
   */
  async deleteAutoTagRule(shopId: string, ruleId: string): Promise<void> {
    return this.client.delete(`/shops/${shopId}/auto-tag-rules/${ruleId}`);
  }

  /**
   * Run auto-tag rules
   */
  async runAutoTagRules(shopId: string, params?: {
    type?: string;
    resource_ids?: string[];
  }): Promise<{
    processed: number;
    tagged: number;
    rules_applied: number;
  }> {
    return this.client.post(`/shops/${shopId}/auto-tag-rules/run`, params || {});
  }
}