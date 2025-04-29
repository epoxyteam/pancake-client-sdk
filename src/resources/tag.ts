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
  async list(params?: TagListParams): Promise<{
    data: Tag[];
  }> {
    return this.client.get(this.getShopPath('/tags'), params);
  }

  /**
   * Get tag by ID
   */
  async getById(tagId: string): Promise<Tag> {
    return this.client.get(this.getShopPath(`/tags/${tagId}`));
  }

  /**
   * Create new tag
   */
  async create(data: CreateTagRequest): Promise<Tag> {
    return this.client.post(this.getShopPath('/tags'), data);
  }

  /**
   * Update tag
   */
  async update(tagId: string, data: UpdateTagRequest): Promise<Tag> {
    return this.client.put(this.getShopPath(`/tags/${tagId}`), data);
  }

  /**
   * Delete tag
   */
  async delete(tagId: string): Promise<void> {
    return this.client.delete(this.getShopPath(`/tags/${tagId}`));
  }

  /**
   * List tag groups
   */
  async listGroups(type?: string): Promise<{
    data: TagGroup[];
  }> {
    return this.client.get(this.getShopPath('/tag-groups'), { type });
  }

  /**
   * Create tag group
   */
  async createGroup(data: CreateTagGroupRequest): Promise<TagGroup> {
    return this.client.post(this.getShopPath('/tag-groups'), data);
  }

  /**
   * Update tag group
   */
  async updateGroup(groupId: string, data: Partial<CreateTagGroupRequest>): Promise<TagGroup> {
    return this.client.put(this.getShopPath(`/tag-groups/${groupId}`), data);
  }

  /**
   * Delete tag group
   */
  async deleteGroup(groupId: string): Promise<void> {
    return this.client.delete(this.getShopPath(`/tag-groups/${groupId}`));
  }

  /**
   * Get resource tags
   */
  async getResourceTags(
    resourceType: string,
    resourceId: string
  ): Promise<{ data: TagAssignment[] }> {
    return this.client.get(
      this.getShopPath(`/${resourceType}/${resourceId}/tags`)
    );
  }

  /**
   * Add tags to resource
   */
  async addTagsToResource(
    resourceType: string,
    resourceId: string,
    tagIds: string[]
  ): Promise<TagAssignment[]> {
    return this.client.post(
      this.getShopPath(`/${resourceType}/${resourceId}/tags`),
      { tag_ids: tagIds }
    );
  }

  /**
   * Remove tag from resource
   */
  async removeTagFromResource(
    resourceType: string,
    resourceId: string,
    tagId: string
  ): Promise<void> {
    return this.client.delete(
      this.getShopPath(`/${resourceType}/${resourceId}/tags/${tagId}`)
    );
  }

  /**
   * Get tag statistics
   */
  async getStats(): Promise<TagStats> {
    return this.client.get(this.getShopPath('/tags/stats'));
  }

  /**
   * Bulk tag resources
   */
  async bulkTag(data: BulkTagRequest): Promise<BulkTagResponse> {
    return this.client.post(this.getShopPath('/tags/bulk'), data);
  }

  /**
   * Get tag suggestions for resource
   */
  async getSuggestions(
    resourceType: string,
    resourceId: string
  ): Promise<{ data: TagSuggestion[] }> {
    return this.client.get(
      this.getShopPath(`/${resourceType}/${resourceId}/tag-suggestions`)
    );
  }

  /**
   * List auto-tag rules
   */
  async listAutoTagRules(type?: string): Promise<{
    data: AutoTagRule[];
  }> {
    return this.client.get(this.getShopPath('/auto-tag-rules'), { type });
  }

  /**
   * Create auto-tag rule
   */
  async createAutoTagRule(data: Omit<AutoTagRule, 'id' | 'created_at' | 'updated_at'>): Promise<AutoTagRule> {
    return this.client.post(this.getShopPath('/auto-tag-rules'), data);
  }

  /**
   * Update auto-tag rule
   */
  async updateAutoTagRule(ruleId: string, data: Partial<AutoTagRule>): Promise<AutoTagRule> {
    return this.client.put(this.getShopPath(`/auto-tag-rules/${ruleId}`), data);
  }

  /**
   * Delete auto-tag rule
   */
  async deleteAutoTagRule(ruleId: string): Promise<void> {
    return this.client.delete(this.getShopPath(`/auto-tag-rules/${ruleId}`));
  }

  /**
   * Run auto-tag rules
   */
  async runAutoTagRules(params?: {
    type?: string;
    resource_ids?: string[];
  }): Promise<{
    processed: number;
    tagged: number;
    rules_applied: number;
  }> {
    return this.client.post(this.getShopPath('/auto-tag-rules/run'), params || {});
  }
}